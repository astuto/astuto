function createNewOrdering(
  oldOrder: Array<any>,
  sourceIndex: number,
  destinationIndex: number
) {
  let newOrder = JSON.parse(JSON.stringify(oldOrder));

  const [reorderedItem] = newOrder.splice(sourceIndex, 1);
  newOrder.splice(destinationIndex, 0, reorderedItem);

  return newOrder;
}

export default createNewOrdering;