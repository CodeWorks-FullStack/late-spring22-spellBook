import { ProxyState } from "../AppState.js";
import { Spell } from "../Models/Spell.js";

const sandboxApi = axios.create({
  baseURL: 'https://bcw-sandbox.herokuapp.com/api/cleatavius/spells',
  timeout: 12000
})


class SandboxSpellsService{
  async getSandboxSpells() {
    const res = await sandboxApi.get() //when using and axios create the whole baseURL is included in the request
    console.log('getSandBoxSpells', res.data);
    ProxyState.sandboxSpells = res.data.map( s => new Spell(s))
  }
  async saveSpell() {
    let spell = ProxyState.activeSpell
    // NOTE need to pass empty string so we can pass the body as the second argument
    const res = await sandboxApi.post('', spell)//the body of the request is always the second argument, so we have to pass nothing for the first so we don't mess up the url
    console.log('saveSpell',res.data)
    ProxyState.sandboxSpells = [...ProxyState.sandboxSpells, new Spell(res.data)]
  }
  
  async deleteSpell(id) {
    const res = await sandboxApi.delete(id)//cause we used axios create, only passing the id here just appends it to the end of the base url resulting in a url like'...api/cleatavius/spells/6tf6whatevertheidis3456' 
    console.log('deleteSpell', res.data);
    ProxyState.sandboxSpells = ProxyState.sandboxSpells.filter(s => s.id != id)
  }
  
  // NOTE not async cause the data we want is already in our appstate, we just need to find ti
  setActiveSpell(id) {
    let spell = ProxyState.sandboxSpells.find( s => s.id == id)
    ProxyState.activeSpell = spell
  }
  
  async prepareSpell(id) {
    // NOTE finding the spell we clicked on
    let spell = ProxyState.sandboxSpells.find(s => s.id == id)
    console.log(spell);
    // NOTE flipping the bool (true to false or false to true)
    spell.prepared = !spell.prepared
    const res = await sandboxApi.put(spell.id, spell)
    console.log('prepareSpell', res.data);
    ProxyState.sandboxSpells = ProxyState.sandboxSpells
    // NOTE since the actual object in the appstate was changed, we just have to trick the listener to fire, we don't have to do anything with the res.data other than log it
  }
}

export const sandboxSpellsService = new SandboxSpellsService()