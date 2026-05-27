import {images} from '../assets/assets';
import type {AnimalItem} from '../types/models';

export const animals: AnimalItem[] = [
  {
    id: 'african-lion',
    name: 'African Lion',
    tag: 'Mammal',
    habitat: 'Savanna, grasslands, open woodland',
    region: 'Sub-Saharan Africa',
    size: '1.4-2.5 m body length',
    status: 'Vulnerable',
    image: images.animals.africanLion,
    about:
      'The African lion is one of the most iconic predators of the savanna. Its powerful body, social pride structure, and deep roar make it a key hunter that helps keep herbivore populations balanced.',
    behavior:
      'Lions are highly social compared with most big cats. They live in prides, protect territory, rest through hot parts of the day, and often hunt in coordinated groups during evening, night, or early morning.',
    keyFacts: ['Lions can rest for up to 20 hours a day.', 'A lion roar can be heard from several kilometers away.', 'Female lions often hunt in coordinated groups.', 'Cubs learn by watching older pride members.', 'Lions are apex predators.'],
  },
  {
    id: 'african-elephant',
    name: 'African Elephant',
    tag: 'Mammal',
    habitat: 'Savanna, forest, wetlands, grasslands',
    region: 'Africa',
    size: 'Up to 4 m shoulder height',
    status: 'Endangered',
    image: images.animals.africanElephant,
    about:
      'The African elephant is the largest land animal on Earth and an ecosystem engineer. Elephants open pathways, dig for water, spread seeds, and influence forests, grasslands, and water access for many species.',
    behavior:
      'Elephants live in family groups led by a matriarch. Their behavior is guided by memory, communication, strong bonds, calf protection, migration routes, and quick responses to danger.',
    keyFacts: ['Elephants can recognize familiar individuals after many years.', 'Their trunks have thousands of muscles.', 'Elephants spread seeds and help forests regenerate.', 'A matriarch memory can guide the herd to water.', 'Calves rely heavily on mothers and other females.'],
  },
  {
    id: 'cheetah',
    name: 'Cheetah',
    tag: 'Mammal',
    habitat: 'Open savanna, dry grasslands, scrubland',
    region: 'Africa and small parts of Iran',
    size: '1.1-1.5 m body length',
    status: 'Vulnerable',
    image: images.animals.cheetah,
    about:
      'The cheetah is the fastest land animal, built for explosive speed instead of brute strength. Its long legs, flexible spine, deep chest, and long tail support short, precise chases.',
    behavior:
      'Cheetahs hunt by day, locate prey with vision, approach carefully, and launch a sprint at the right moment. After a chase they must rest because high-speed running uses intense energy.',
    keyFacts: ['Cheetahs reach very high speeds for short distances.', 'Their tail helps with balance during sharp turns.', 'Dark eye markings may reduce glare.', 'Cheetahs chirp, purr, hiss, and growl.', 'Speed works only for short chases.'],
  },
  {
    id: 'zebra',
    name: 'Zebra',
    tag: 'Mammal',
    habitat: 'Savanna, grasslands, open woodland',
    region: 'Africa',
    size: '2-2.6 m body length',
    status: 'Varies by species',
    image: images.animals.zebra,
    about:
      'Zebras are wild equids known for black-and-white stripe patterns that are unique to each individual. Their grazing helps maintain grassland balance and creates feeding opportunities for other herbivores.',
    behavior:
      'Zebras rely on herd awareness, speed, kicking power, and sharp senses. They communicate with ear positions, facial expressions, calls, and body movement while staying alert in open landscapes.',
    keyFacts: ['No two zebras have exactly the same stripe pattern.', 'Zebras can deliver powerful kicks.', 'They often move with wildebeest during migrations.', 'Herds help detect danger.', 'Foals learn their mother stripe pattern early.'],
  },
  {
    id: 'giraffe',
    name: 'Giraffe',
    tag: 'Mammal',
    habitat: 'Savanna, open woodland, dry forests',
    region: 'Africa',
    size: 'Up to 5.5 m tall',
    status: 'Vulnerable',
    image: images.animals.giraffe,
    about:
      'The giraffe is the tallest land animal, recognized by its long neck, long legs, spotted coat, and calm browsing behavior. It reaches leaves and shoots that many other herbivores cannot access.',
    behavior:
      'Giraffes move in loose groups, scan the horizon from a high viewpoint, and protect calves. Males may fight by swinging their necks, while drinking requires caution because bending down increases vulnerability.',
    keyFacts: ['A giraffe neck has the same number of vertebrae as a human neck.', 'Their long tongues help pull leaves from thorny branches.', 'Height helps spot predators.', 'Calves can stand soon after birth.', 'Giraffes sleep for short periods.'],
  },
  {
    id: 'bengal-tiger',
    name: 'Bengal Tiger',
    tag: 'Mammal',
    habitat: 'Forests, grasslands, mangroves, wetlands',
    region: 'India, Bangladesh, Nepal, Bhutan',
    size: '2.7-3.1 m including tail',
    status: 'Endangered',
    image: images.animals.bengalTiger,
    about:
      'The Bengal tiger is a powerful solitary predator that hunts deer, wild boar, buffalo, and other prey. It helps regulate herbivore populations and depends on connected habitats, prey, and protection.',
    behavior:
      'Bengal tigers are territorial and mostly solitary. They use scent marks, scratches, and calls, then hunt with stealth, patience, and sudden ambush from cover.',
    keyFacts: ['Each tiger has a unique stripe pattern.', 'Tigers are excellent swimmers.', 'They usually hunt alone.', 'A tiger territory can be very large.', 'Protecting tigers also protects forests.'],
  },
  {
    id: 'gray-wolf',
    name: 'Gray Wolf',
    tag: 'Mammal',
    habitat: 'Forests, tundra, mountains, grasslands',
    region: 'North America, Europe, Asia',
    size: '1-1.6 m body length',
    status: 'Least Concern globally',
    image: images.animals.grayWolf,
    about:
      'The gray wolf is a highly social predator known for intelligence, teamwork, and pack structure. Wolves influence ecosystems by changing prey behavior and movement.',
    behavior:
      'Wolves live in packs, communicate with howls, scent marks, posture, and facial expression, and hunt through endurance, cooperation, territory defense, pup care, and shared food.',
    keyFacts: ['Wolves can travel long distances for food.', 'Howls help pack members locate each other.', 'They often hunt through endurance.', 'Pack cooperation helps in harsh environments.', 'Wolf recovery can restore natural balance.'],
  },
  {
    id: 'polar-bear',
    name: 'Polar Bear',
    tag: 'Mammal',
    habitat: 'Arctic sea ice, coastal areas, tundra',
    region: 'Arctic',
    size: '2.4-3 m body length',
    status: 'Vulnerable',
    image: images.animals.polarBear,
    about:
      'The polar bear is a large Arctic predator adapted to life on sea ice. It depends on frozen ocean platforms to hunt seals and survive cold conditions.',
    behavior:
      'Polar bears are mostly solitary. They wait near seal breathing holes, follow scent over long distances, conserve energy, and mothers build snow dens to protect cubs.',
    keyFacts: ['Polar bears have black skin under white-looking fur.', 'Large paws work like snowshoes and paddles.', 'They can smell seals from great distances.', 'Sea ice is essential for hunting.', 'Cubs learn Arctic survival from mothers.'],
  },
  {
    id: 'giant-panda',
    name: 'Giant Panda',
    tag: 'Mammal',
    habitat: 'Mountain bamboo forests',
    region: 'China',
    size: '1.2-1.9 m body length',
    status: 'Vulnerable',
    image: images.animals.giantPanda,
    about:
      'The giant panda is a bear species connected to cool mountain bamboo forests. Its conservation has become a major symbol of habitat protection and species recovery.',
    behavior:
      'Pandas are mostly solitary and conserve energy because bamboo is low in calories. They spend many hours feeding, move slowly, scent mark territories, and mothers protect tiny helpless cubs.',
    keyFacts: ['Pandas eat bamboo for many hours each day.', 'A wrist bone works like a thumb.', 'Cubs are tiny at birth.', 'Pandas are excellent climbers.', 'Protecting pandas also protects mountain forests.'],
  },
  {
    id: 'komodo-dragon',
    name: 'Komodo Dragon',
    tag: 'Reptile',
    habitat: 'Dry islands, savanna, scrubland, forest edges',
    region: 'Indonesia',
    size: 'Up to 3 m body length',
    status: 'Endangered',
    image: images.animals.komodoDragon,
    about:
      'The Komodo dragon is the largest living lizard and a top predator on several Indonesian islands. It hunts deer, wild pigs, smaller animals, and carrion.',
    behavior:
      'Komodo dragons are solitary hunters. They use a forked tongue to detect scent particles, ambush prey, bite powerfully, defend feeding opportunities, and young dragons climb trees for safety.',
    keyFacts: ['They detect smells with the tongue and Jacobson organ.', 'Young dragons spend time in trees.', 'They are strong swimmers.', 'Their bite makes them powerful predators.', 'They live naturally in a limited region.'],
  },
  {
    id: 'galapagos-giant-tortoise',
    name: 'Galapagos Giant Tortoise',
    tag: 'Reptile',
    habitat: 'Dry lowlands, humid highlands, volcanic islands',
    region: 'Galapagos Islands, Ecuador',
    size: 'Up to 1.5 m shell length',
    status: 'Vulnerable',
    image: images.animals.galapagosTortoise,
    about:
      'The Galapagos giant tortoise is one of the largest and longest-living tortoises. It shapes vegetation, spreads seeds, and shows island adaptation through different shell forms.',
    behavior:
      'These tortoises follow routines connected to feeding, resting, thermoregulation, and seasonal movement. They use sun and shade to regulate body temperature and can survive with limited food and water.',
    keyFacts: ['Some can live for more than 100 years.', 'They spread seeds through digestion.', 'Shell shape varies between island populations.', 'They spend much of the day grazing and resting.', 'Conservation programs helped populations recover.'],
  },
  {
    id: 'bald-eagle',
    name: 'Bald Eagle',
    tag: 'Bird',
    habitat: 'Forests near lakes, rivers, wetlands, coasts',
    region: 'North America',
    size: 'Wingspan up to 2.3 m',
    status: 'Least Concern',
    image: images.animals.baldEagle,
    about:
      'The bald eagle is a large bird of prey known for its white head, dark body, strong beak, and powerful flight. It is closely connected to water because fish are a major food source.',
    behavior:
      'Bald eagles use sharp vision to spot prey, dive or glide to catch fish with talons, scavenge when possible, defend nesting territories, and raise chicks as pairs.',
    keyFacts: ['Bald eagles can see prey from far away.', 'They build huge nests and reuse them.', 'Fish are a main food source.', 'Both parents help raise young.', 'Their population recovered after conservation action.'],
  },
  {
    id: 'green-sea-turtle',
    name: 'Green Sea Turtle',
    tag: 'Marine Reptile',
    habitat: 'Coral reefs, seagrass beds, coasts, beaches',
    region: 'Tropical and subtropical oceans',
    size: 'Up to 1.5 m shell length',
    status: 'Endangered',
    image: images.animals.greenSeaTurtle,
    about:
      'The green sea turtle spends most of its life in the ocean but returns to sandy beaches to nest. Adult turtles graze on seagrass and algae, helping maintain marine habitats.',
    behavior:
      'Green sea turtles navigate long migrations between feeding grounds and nesting beaches. Females often return to the same beach area where they hatched, while hatchlings move toward the sea using natural light cues.',
    keyFacts: ['Females return to beaches to lay eggs.', 'Hatchlings move toward the sea soon after emerging.', 'Adults feed on seagrass and algae.', 'They migrate very long distances.', 'Healthy turtles support healthy marine ecosystems.'],
  },
  {
    id: 'red-eyed-tree-frog',
    name: 'Red-Eyed Tree Frog',
    tag: 'Amphibian',
    habitat: 'Tropical rainforest, wet forest edges, ponds',
    region: 'Central America',
    size: '5-7 cm body length',
    status: 'Least Concern',
    image: images.animals.redEyedTreeFrog,
    about:
      'The red-eyed tree frog is a colorful amphibian with a bright green body, red eyes, orange feet, and blue side markings. Its sudden colors can startle predators long enough to escape.',
    behavior:
      'Red-eyed tree frogs are active at night. They climb with sticky toe pads, rest folded on leaves during the day, hunt insects after dark, and lay eggs on leaves above water.',
    keyFacts: ['Bright colors can startle predators.', 'Sticky toe pads help them climb leaves.', 'They are mostly nocturnal.', 'Eggs are laid above water.', 'Moist rainforest habitat is essential.'],
  },
  {
    id: 'snow-leopard',
    name: 'Snow Leopard',
    tag: 'Mammal',
    habitat: 'High mountains, rocky slopes, alpine zones',
    region: 'Central and South Asia',
    size: '1-1.3 m body length plus long tail',
    status: 'Vulnerable',
    image: images.animals.snowLeopard,
    about:
      'The snow leopard is a rare mountain predator adapted to cold, rocky, high-altitude habitats. Thick fur, wide paws, powerful legs, and a long tail help it move across cliffs and snow.',
    behavior:
      'Snow leopards are solitary and secretive. They use rocky cover, stealth, climbing ability, scent marking, protected dens, and balance from the long tail to survive harsh terrain.',
    keyFacts: ['They are called ghosts of the mountains.', 'Wide paws help them walk on snow.', 'The long tail helps with balance and warmth.', 'They are excellent climbers and jumpers.', 'Protecting them protects high mountain ecosystems.'],
  },
  {
    id: 'orangutan',
    name: 'Orangutan',
    tag: 'Mammal',
    habitat: 'Tropical rainforest, peat swamp forest',
    region: 'Borneo and Sumatra',
    size: '1.2-1.5 m height',
    status: 'Critically Endangered',
    image: images.animals.orangutan,
    about:
      'The orangutan is a highly intelligent great ape that spends much of its life in trees. It feeds on fruit, leaves, bark, insects, and helps forests regenerate by spreading seeds.',
    behavior:
      'Orangutans are mostly solitary. They remember food sources, move carefully through the canopy, build sleeping nests, use tools in some areas, and young stay with mothers for many years.',
    keyFacts: ['Orangutans are among the most intelligent non-human animals.', 'They build nests in trees for sleeping.', 'Young stay with mothers for years.', 'They spread rainforest seeds.', 'Habitat loss is a major threat.'],
  },
];
