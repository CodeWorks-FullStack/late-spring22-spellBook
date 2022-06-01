

export class Spell{
  constructor(data){
    // NOTE some of this data formatting just differs based on the apis, your mashing together
    this.id = data.index || data.id
    this.name = data.name
    // FIXME we will have to fix this just not right now i need to teach another quick concept
    this.description = data.desc?.join('<br>') || data.description
    // NOTE '?' tells js to stop digging down if the 'damage' is undefined
    this.damage = data.damage?.damage_type?.name || data.damage
    this.level = data.level
    this.range = data.range
    this.material = data.material
    this.ritual = data.ritual
    this.concentration = data.concentration
    this.castingTime = data.casting_time || data.castingTime
    this.duration = data.duration
    this.components = data.components
    this.prepared = data.prepared || false
  }

  // NOTE used to list the spell names from the dnd api
  static ListTemplate(spell){
    return `<b class="selectable" onclick="app.dndSpellsController.getSpellDetails('${spell.index}')"> ${spell.name} </b>`
  }

  // NOTE used to display the large view of the spell in the center
  // this.description in the center is the swappable view it starts with
  get DetailsTemplate(){
    return `
    <div class="col-12 d-flex text-center justify-content-between p-3">
    <h4>${this.name}</h4>
    <button class="btn btn-danger" onclick="app.sandboxSpellsController.saveSpell()"> Save Spell</button>
    </div>
    <div class="col-12 ">
      <h6>level: ${this.level}</h6>
    </div>
    <div id="spell-body" class="col-12 text-center">
    
    ${this.Description }

    </div>
    `
  }

  // NOTE used for the list of my spells from the sandbox
  get SandBoxTemplate(){
    return `
    <div class="col-12">
    <div class="row">
      <div class="col-2">
        <input type="checkbox" ${this.prepared ? 'checked' : ''} onclick="app.sandboxSpellsController.prepareSpell('${this.id}')">
      </div>
      <div class="col selectable" onclick="app.sandboxSpellsController.setActiveSpell('${this.id}')">${this.name}</div>
      <div class="col-2 selectable text-danger" onclick="app.sandboxSpellsController.deleteSpell('${this.id}')"><i class="mdi mdi-close"></i></div>
    </div>
  </div>
    `
  }

  // NOTE friday is right around the corner

  // NOTE the description view has a button that calls to see the stats
  get Description(){
    return `
    <button  class=" p-2 btn btn-outline-danger" onclick="app.sandboxSpellsController.seeStats()"> see stats </button>
    <p class="text-start">${this.description}</p>
    `
  }

  // NOTE the stats view has a button that calls to see the description
  get Stats(){
    return`
    <button class=" p-2 btn btn-outline-danger" onclick="app.sandboxSpellsController.seeDescription()"> see description</button>
    <h5> ${this.components}</h5>
    <h5> ${this.concentration ? 'concentration |': ''} ${this.ritual ? 'ritual |' : ''}  ${this.damage || ''}</h5>
    <h5> ${this.range}| ${this.duration} | ${this.castingTime}</h5>
    <h5> ${this.material}</h5>
    `
  }
}