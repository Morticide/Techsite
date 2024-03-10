Hooks.once("init", async function () {
  libWrapper.register(
    "quick-doors",
    "Canvas.prototype._onClickLeft",
    QuickDoors._onClickLeft
  );

  libWrapper.register(
    "quick-doors",
    "Canvas.prototype._onClickRight",
    QuickDoors._onClickRight
  );
});

Hooks.once("ready", async function () {});

Hooks.on("getSceneControlButtons", (controls) => {
  controls
    .find((c) => c.name === "walls")
    .tools.push({
      name: "quickdoors",
      title: "Quick Doors",
      icon: "fas fa-drafting-compass",
      toggle: true,
      active: ui?.controls?.quickDoors ?? false,
      visible: game.user.isGM,
      onClick: (togg) => {
          ui.controls.quickDoors = togg;
      }
    });
});

$(document).on("contextmenu", `li[data-tool="quickdoors"]`, () => {
  Dialog.confirm({
    title: "Quick Doors - Set door length",
    content: `
    <p>Your grid size is <strong>${canvas.scene.dimensions.size}</strong> Set a different size for Quick Doors?</p>
    <div class="form-group">
            <label>Door Size</label>
            <div class="form-fields">
                
      <input type="number" value="${ui?.controls?.qdSize ?? canvas.scene.dimensions.size}" step="1">
    
            </div>
        </div>
      <p>
    `,
    yes: (html) => {
      ui.controls.qdSize = html.find("input").val();
    },
    no: () => {},
    defaultYes: false,
  });
});