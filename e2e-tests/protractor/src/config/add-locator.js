function addE2ELocator() {
  by.addLocator('e2eId', (value, parent) =>
    (parent || document).querySelectorAll(`[data-e2e-id=${value}]`)
  );
}

module.exports = { addE2ELocator };
