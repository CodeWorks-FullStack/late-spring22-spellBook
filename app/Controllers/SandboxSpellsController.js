import { ProxyState } from "../AppState.js";
import { sandboxSpellsService } from "../Services/SandboxSpellsService.js";
import { Pop } from "../Utils/Pop.js";

function _drawSandBoxSpells(){
  let spells = ProxyState.sandboxSpells
  let template = ''
  let spellCount = 0
  spells.forEach(s => {
    template += s.SandBoxTemplate
    if(s.prepared){
      spellCount++
    }
  })
  document.getElementById('sandbox-spells').innerHTML = template
  document.getElementById('spell-count').innerText = spellCount + '/10'
  document.getElementById('spell-count').classList.remove('text-danger')
  if(spellCount > 10){
    document.getElementById('spell-count').classList.add('text-danger')
  }
}

export class SandboxSpellsController{
  constructor(){
    console.log('loaded sandbox controller');
    ProxyState.on('sandboxSpells', _drawSandBoxSpells)
    this.getSandboxSpells()
    
  }

  async getSandboxSpells(){
    try {
      await sandboxSpellsService.getSandboxSpells()
    } catch (error) {
      console.error(error)
      Pop.toast(error.message, 'error')
    }
  }

  async saveSpell(){
    try {
      console.log('saving ');
      await sandboxSpellsService.saveSpell()
    } catch (error) {
      console.error(error)
      Pop.toast(error.message, 'error')
    }
  }

  async deleteSpell(id){
    try {
      await sandboxSpellsService.deleteSpell(id)
    } catch (error) {
      console.error(error)
      Pop.toast(error.message, 'error')
    }
  }

  setActiveSpell(id){
    sandboxSpellsService.setActiveSpell(id)
  }

  async prepareSpell(id){
    try {
      await  sandboxSpellsService.prepareSpell(id)
    } catch (error) {
      console.error(error)
      Pop.toast(error.message, 'error')
    }
  }

// NOTE this might be helpful friday
  seeDescription(){
    document.getElementById('spell-body').innerHTML = ProxyState.activeSpell.Description
  }

  seeStats(){
    document.getElementById('spell-body').innerHTML = ProxyState.activeSpell.Stats
  }
}