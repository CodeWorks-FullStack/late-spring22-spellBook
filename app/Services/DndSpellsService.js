import { ProxyState } from "../AppState.js";
import { Spell } from "../Models/Spell.js";

const dndApi = axios.create({
  baseURL : 'https://www.dnd5eapi.co/api/spells',
  timeout: 5000
})


class DndSpellsService{
  async getDndSpells() {
    const res = await dndApi.get()
    console.log('getDndSpells', res.data);
    // NOTE if you saw .map(s => s) here before that's cause I forgot to get rid of the map after we decided these were not 'Spells'
    ProxyState.dndSpells = res.data.results
  }
  
  async getSpellDetails(index) {
    const res = await dndApi.get( index)
    console.log('getSpellDetails', res.data);
    ProxyState.activeSpell = new Spell(res.data)
  }

}

export const dndSpellsService = new DndSpellsService()