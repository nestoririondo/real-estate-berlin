/**
 * Generic toggle logic for multi-select filters with an "ALL" option
 * @param currentValues - Current selected values
 * @param toggleValue - Value to toggle
 * @param allValue - The "ALL" constant value
 * @returns New array of selected values
 */
export function toggleFilterValue<T>(
  currentValues: T[],
  toggleValue: T,
  allValue: T
): T[] {
  // If "All" is currently selected
  if (currentValues.includes(allValue)) {
    // If clicking "All" when it's already selected, do nothing
    if (toggleValue === allValue) {
      return currentValues;
    }
    // Replace "All" with the new selection
    return [toggleValue];
  }

  // If clicking "All", replace everything with just "All"
  if (toggleValue === allValue) {
    return [allValue];
  }

  // Toggle the value
  if (currentValues.includes(toggleValue)) {
    // Remove it
    const newValues = currentValues.filter((v) => v !== toggleValue);
    // If no values selected, default to "All"
    return newValues.length > 0 ? newValues : [allValue];
  }

  // Add it
  return [...currentValues, toggleValue];
}
