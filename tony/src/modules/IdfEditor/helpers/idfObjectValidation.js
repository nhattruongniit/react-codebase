function parseNumber(string) {
  const result = parseFloat(string);
  if (!Number.isNaN(result)) {
    return result;
  }
  return null;
}

export function validateObjectValue(fieldDefinition, value) {
  const required = fieldDefinition.options['required-field'] === '1';
  const inputType = !fieldDefinition.options.type || fieldDefinition.options.choices === null && fieldDefinition.options.type === 'alpha' ? 'text' : 'number';
  const maxAndLessThan = parseNumber(fieldDefinition.options['maximum<']);
  const minAndGreaterThan = parseNumber(fieldDefinition.options['minimum>']);
  const min = parseNumber(fieldDefinition.options['minimum']);
  const max = parseNumber(fieldDefinition.options.maximum);
  const numberValue = parseFloat(value);

  if (inputType === 'number' &&
    (
      max !== null && numberValue > max ||
      maxAndLessThan !== null && numberValue >= maxAndLessThan ||
      min !== null && numberValue < min ||
      minAndGreaterThan !== null && numberValue <= minAndGreaterThan
    )
  ) {
    return {
      valid: false,
      reason: 'Invalid value',
    };
  }

  if (!value && value !== 0 && required) {
    return {
      valid: false,
      reason: 'Empty required field',
    };
  }

  return {
    valid: true,
  };
}

export function getMinimumValue(fieldDefinition) {
  const maxAndLessThan = parseNumber(fieldDefinition.options['maximum<']);
  const minAndGreaterThan = parseNumber(fieldDefinition.options['minimum>']);
  const min = parseNumber(fieldDefinition.options['minimum']);
  const max = parseNumber(fieldDefinition.options.maximum);
  if(minAndGreaterThan !==null) {
    if(maxAndLessThan !==null) {
      return (minAndGreaterThan + maxAndLessThan) / 2
    }else {
      return minAndGreaterThan + 1;
    }
  }
  if(maxAndLessThan !==null) {
    return maxAndLessThan - 1;
  }

  if(min !==null) {
    if(max !==null) {
      return (min + max) / 2
    }else {
      return min + 1;
    }
  }
  if(max !==null) {
    return max - 1;
  }
}