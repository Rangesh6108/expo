/**
 A protocol that allows initializing the object with a dictionary.
 */
public protocol Record: AnyMethodArgument {
  typealias Dict = [String: Any]
  typealias Pair = (key: String, field: AnyField)

  init()
  init(dictionary: Dict)
  func toDictionary() -> Dict
}

/**
 Provides the default implementation of `Record` protocol.
 */
public extension Record {
  /**
   Initializes an object from given dictionary. Only members wrapped by `@Field` will be set in the object.
   */
  init(dictionary: Dict) {
    self.init()

    makeIterator().forEach { (key, field) in
      field.set(dictionary[key] as Any)
    }
  }

  /**
   Converts an object back to the dictionary. Only members wrapped by `@Field` will be set in the dictionary.
   */
  func toDictionary() -> Dict {
    return makeIterator().reduce(into: Dict()) { result, pair in
      result[pair.key] = pair.field.get()
    }
  }

  /**
   Creates an iterator over record's pairs.
   */
  func makeIterator() -> Array<Pair>.Iterator {
    let children: [Pair] = Mirror(reflecting: self).children.compactMap { (label: String?, value: Any) in
      guard let value = value as? AnyField, let key = value.customKey ?? convertLabelToKey(label) else {
        return nil
      }
      return (key, value)
    }
    return children.makeIterator()
  }
}

/**
 Converts mirror's label to field's key by dropping the "_" prefix from wrapped property label.
 */
fileprivate func convertLabelToKey(_ label: String?) -> String? {
  return (label != nil && label!.starts(with: "_")) ? String(label!.dropFirst()) : label
}
