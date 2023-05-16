class Renderer {
  render(placeToRender, whatToRender) {
    // Voegt whatToRender in de HTML bij placeToRender
    document.querySelector(placeToRender).appendChild(whatToRender);
  }
}
