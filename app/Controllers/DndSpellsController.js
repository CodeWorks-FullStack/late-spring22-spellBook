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
      // NOTE console error AND pop notification should be in your catch, one tells the user something bad happened, the other logs the data in the console for use.
      console.error(error)
      Pop.toast(error.message, 'error')
    }
  }

  // NOTE when getting all spells from the dnd api each spell only included the name and an index, we can use that index to get the whole spell object
  async getSpellDetails(index){
    try {
      await dndSpellsService.getSpellDetails(index)
    } catch (error) {
      console.error(error)
      Pop.toast(error.message, 'error')
    }
  }
}