// Async Exercise: Sequential vs Parallel API calls
// We'll fetch 10 Pokemon from PokeAPI and compare the two approaches.

const POKEMON_IDS = [1, 4, 7, 25, 39, 94, 130, 143, 150, 151];

async function fetchPokemon(id) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const data = await res.json();
  return { id: data.id, name: data.name, types: data.types.map(t => t.type.name) };
}

// Version 1: Sequential (like your Salesforce project)
// Each call waits for the previous one to finish before starting.
async function sequential() {
  const results = [];
  for (const id of POKEMON_IDS) {
    const pokemon = await fetchPokemon(id);
    results.push(pokemon);
  }
  return results;
}

// Version 2: Parallel (Promise.all)
// All calls fire at once, we wait for ALL of them to finish.
async function parallel() {
  const results = await Promise.all(POKEMON_IDS.map(id => fetchPokemon(id)));
  return results;
}

// Run both and compare
async function main() {
  console.log(`Fetching ${POKEMON_IDS.length} Pokemon...\n`);

  // Sequential
  const seqStart = performance.now();
  const seqResults = await sequential();
  const seqTime = (performance.now() - seqStart).toFixed(0);

  console.log(`SEQUENTIAL: ${seqTime}ms`);
  seqResults.forEach(p => console.log(`  #${p.id} ${p.name} [${p.types.join(", ")}]`));

  console.log("");

  // Parallel
  const parStart = performance.now();
  const parResults = await parallel();
  const parTime = (performance.now() - parStart).toFixed(0);

  console.log(`PARALLEL:   ${parTime}ms`);
  parResults.forEach(p => console.log(`  #${p.id} ${p.name} [${p.types.join(", ")}]`));

  console.log(`\n--- SPEEDUP: ${(seqTime / parTime).toFixed(1)}x faster with Promise.all ---`);
}

main();
