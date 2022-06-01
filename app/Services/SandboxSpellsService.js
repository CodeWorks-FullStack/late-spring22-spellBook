import { ProxyState } from "../AppState.js";
import { Spell } from "../Models/Spell.js";

const sandboxApi = axios.create({
  baseURL: 'https://bcw-sandbox.herokuapp.com/api/cleatavius/spells',
  timeout: 12000
})


class SandboxSpellsService{
  async getSandboxSpells() {
    const res = await sandboxApi.get()
    console.log('getSandBoxSpells', res.data);
    ProxyState.sandboxSpells = res.data.map( s => new Spell(s))
  }
  async saveSpell() {
    let spell = ProxyState.activeSpell
    // NOTE need to pass empty string so we can pass the body as the second argument
    const res = await sandboxApi.post('', spell)
    console.log('saveSpell',res.data)
    ProxyState.sandboxSpells = [...ProxyState.sandboxSpells, new Spell(res.data)]
  }
  
  async deleteSpell(id) {
    const res = await sandboxApi.delete(id)
    console.log('deleteSpell', res.data);
    ProxyState.sandboxSpells = ProxyState.sandboxSpells.filter(s => s.id != id)
  }
  
  setActiveSpell(id) {
    let spell = ProxyState.sandboxSpells.find( s => s.id == id)
    ProxyState.activeSpell = spell
  }
  
  async prepareSpell(id) {
    // NOTE finding the spell
    let spell = ProxyState.sandboxSpells.find(s => s.id == id)
    console.log(spell);
    // NOTE flipping the bool
    spell.prepared = !spell.prepared
    const res = await sandboxApi.put(spell.id, spell)
    console.log('prepareSpell', res.data);
    ProxyState.sandboxSpells = ProxyState.sandboxSpells
  }
}

export const sandboxSpellsService = new SandboxSpellsService()