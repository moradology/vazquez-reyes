#!/usr/bin/env swift

import AppKit
import Foundation
import Vision

struct OCRLine: Codable {
    let text: String
    let confidence: Float
    let x: CGFloat
    let y: CGFloat
    let width: CGFloat
    let height: CGFloat
}

struct OCRPage: Codable {
    let path: String
    let lines: [OCRLine]
    let error: String?
}

func recognize(_ path: String) -> OCRPage {
    let url = URL(fileURLWithPath: path)
    guard
        let image = NSImage(contentsOf: url),
        let cgImage = image.cgImage(forProposedRect: nil, context: nil, hints: nil)
    else {
        return OCRPage(path: path, lines: [], error: "Could not load image")
    }

    let request = VNRecognizeTextRequest()
    request.recognitionLevel = .accurate
    request.recognitionLanguages = ["es-ES"]
    request.usesLanguageCorrection = true
    request.minimumTextHeight = 0.008
    if let customWords = ProcessInfo.processInfo.environment["OCR_CUSTOM_WORDS"] {
        request.customWords = customWords
            .split(separator: ",")
            .map { $0.trimmingCharacters(in: .whitespacesAndNewlines) }
            .filter { !$0.isEmpty }
    }

    do {
        let handler = VNImageRequestHandler(cgImage: cgImage, orientation: .up)
        try handler.perform([request])

        let lines = (request.results ?? []).compactMap { observation -> OCRLine? in
            guard let candidate = observation.topCandidates(1).first else {
                return nil
            }
            let box = observation.boundingBox
            return OCRLine(
                text: candidate.string,
                confidence: candidate.confidence,
                x: box.origin.x,
                y: box.origin.y,
                width: box.width,
                height: box.height
            )
        }.sorted {
            if abs($0.y - $1.y) > 0.01 {
                return $0.y > $1.y
            }
            return $0.x < $1.x
        }

        return OCRPage(path: path, lines: lines, error: nil)
    } catch {
        return OCRPage(path: path, lines: [], error: String(describing: error))
    }
}

let paths = Array(CommandLine.arguments.dropFirst())
guard !paths.isEmpty else {
    FileHandle.standardError.write(
        Data("usage: ocr-handwriting.swift IMAGE [IMAGE ...]\n".utf8)
    )
    exit(2)
}

let encoder = JSONEncoder()
encoder.outputFormatting = [.withoutEscapingSlashes]

for path in paths {
    let page = recognize(path)
    if let data = try? encoder.encode(page) {
        FileHandle.standardOutput.write(data)
        FileHandle.standardOutput.write(Data("\n".utf8))
    }
}
