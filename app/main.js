import { DndSpellsController } from "./Controllers/DndSpellsController.js";
import { SandboxSpellsController } from "./Controllers/SandboxSpellsController.js";

class App {
  // valuesController = new ValuesController();
  dndSpellsController = new DndSpellsController()
  sandboxSpellsController = new SandboxSpellsController()
}

window["app"] = new App();
