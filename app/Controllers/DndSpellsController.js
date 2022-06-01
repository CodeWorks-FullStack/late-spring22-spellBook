import { ProxyState } from '../AppState.js';
import { Spell } from '../Models/Spell.js';
import { dndSpellsService } from '../Services/DndSpellsService.js';
import { Pop } from '../Utils/Pop.js';

function _draw(){
  let spells = ProxyState.dndSpells
  let template = ''
  spells.forEach( s => template += Spell.ListTemplate(s))
  document.getElementById('dnd-spells').innerHTML = template
}

function _drawSpellDetails(){
  let spell = ProxyState.activeSpell
  document.getElementById('spell-details').innerHTML = spell.DetailsTemplate
}

export class DndSpellsController{
  constructor(){
    console.log('load dnd spells', ProxyState.dndSpells);
    ProxyState.on('dndSpells', _draw)
    ProxyState.on('activeSpell', _drawSpellDetails)
    _draw()
    this.getDndSpells()
  }

  async getDndSpells(){
    try {
      await dndSpellsService.getDndSpells()
    } catch (error) {
      console.error(error)
      Pop.toast(error.message, 'error')
    }
  }

  async getSpellDetails(index){
    try {
      await dndSpellsService.getSpellDetails(index)
    } catch (error) {
      console.error(error)
      Pop.toast(error.message, 'error')
    }
  }
}