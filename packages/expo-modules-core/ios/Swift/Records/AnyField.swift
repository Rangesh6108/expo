/**
 Protocol for type-erased record fields.
 */
public protocol AnyField {
  var customKey: String? { get }

  func get() -> Any?
  func set(_ newValue: Any?)
}
