import Quick
import Nimble

@testable import ExpoModulesCore

class RecordSpec: QuickSpec {
  override func spec() {
    it("initializes with empty dictionary") {
      struct TestRecord: Record {}
      expect({ TestRecord(dictionary: [:]) }).notTo(raiseException())
    }

    it("works with a field") {
      struct TestRecord: Record {
        @Field var a: String? = nil
      }
      let dict = ["a": "b"]

      expect({ TestRecord(dictionary: dict) }).notTo(raiseException())
      expect(TestRecord(dictionary: dict).a).to(be(dict["a"]))
      expect(TestRecord(dictionary: dict).toDictionary()["a"]).to(be(dict["a"]))
    }

    it("works with a keyed field") {
      struct TestRecord: Record {
        @Field(key: "key") var a: String? = nil
      }
      let dict = ["key": "b"]

      expect({ TestRecord(dictionary: dict) }).notTo(raiseException())
      expect(TestRecord(dictionary: dict).a).to(be(dict["key"]))
      expect(TestRecord(dictionary: dict).toDictionary()["key"]).to(be(dict["key"]))
    }
  }
}
