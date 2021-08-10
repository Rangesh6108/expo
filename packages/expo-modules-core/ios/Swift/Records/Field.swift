/**
 Property wrapper for `Record`'s data members that takes part in the process of serialization to and deserialization from the dictionary.
 */
@propertyWrapper
public class Field<Type>: AnyField {
  /**
   Customizes the dictionary key to which the field is bound to. If not provided, name of the wrapped property is used.
   */
  public private(set) var customKey: String?

  /**
   Stores the internal value that is optional, as opposed to `wrappedValue`.
   */
  var internalValue: Type?

  public var wrappedValue: Type {
    get {
      return internalValue!
    }
    set {
      internalValue = newValue
    }
  }

  /**
   Initializes the field with given value and customized key.
   */
  public init(wrappedValue: Type, key: String? = nil) {
    self.internalValue = wrappedValue
    self.customKey = key
  }

  /**
   Returns wrapped value as `Any?` to conform to type-erased `AnyField` protocol.
   */
  public func get() -> Any? {
    return wrappedValue
  }

  /**
   Sets the internal value to the new value.
   */
  public func set(_ newValue: Any?) {
    self.internalValue = newValue as? Type
  }
}
