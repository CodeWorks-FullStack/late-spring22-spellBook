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
    ProxyState.dndSpells = res.data.results.map(s => s)
  }
  
  async getSpellDetails(index) {
    const res = await dndApi.get( index)
    console.log('getSpellDetails', res.data);
    ProxyState.activeSpell = new Spell(res.data)
  }

}

export const dndSpellsService = new DndSpellsService()