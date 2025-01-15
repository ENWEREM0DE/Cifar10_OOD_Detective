import { useState } from 'react'
import { HardHatIcon as Hat } from 'lucide-react'

const suspects = [
  { name: 'Airplane', comment: "This bird is definitely not flying under the radar." },
  { name: 'Automobile', comment: "Four wheels, no alibi." },
  { name: 'Bird', comment: "Feathered friend or fowl play?" },
  { name: 'Cat', comment: "The purr-fect suspect." },
  { name: 'Deer', comment: "Oh deer, caught in the headlights!" },
  { name: 'Dog', comment: "Barking up the wrong tree?" },
  { name: 'Frog', comment: "Hopping mad at being a suspect." },
  { name: 'Horse', comment: "Neigh-ver trust a dark horse." },
  { name: 'Ship', comment: "Something fishy about this vessel." },
  { name: 'Truck', comment: "This one's hauling more than just cargo." },
]

const UsualSuspects = () => {
  const [hoveredSuspect, setHoveredSuspect] = useState<string | null>(null)

  return (
    <section id="usual-suspects" className="my-8 bg-[#1A1A2E] p-6 rounded-lg shadow-md border border-[#FFD700]">
      <h2 className="font-serif text-4xl font-bold text-[#FFD700] mb-6 flex items-center">
        <Hat className="mr-2" />
        The Usual Suspects
      </h2>
      <p className="text-[#F5F5DC] font-serif text-xl mb-8">
        Here are images from the CIFAR-10 database.
      </p>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {suspects.map((suspect) => (
          <div 
            key={suspect.name} 
            className="relative"
            onMouseEnter={() => setHoveredSuspect(suspect.name)}
            onMouseLeave={() => setHoveredSuspect(null)}
          >
            <div className="relative w-full pt-[100%] border-2 border-[#FFD700] rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-lg">
            <img
                src={`/images/${suspect.name.toLowerCase()}.jpg`}
                alt={suspect.name}
                className="absolute top-0 left-0 right-0 bottom-0 w-full h-full object-cover"
              />
            </div>
            <p className="mt-2 text-[#FFD700] font-serif text-base flex items-center justify-center">
              <Hat className="mr-1 w-4 h-4" />
              {suspect.name}
            </p>
            {hoveredSuspect === suspect.name && (
              <div className="absolute inset-0 bg-[#1A1A2E] bg-opacity-90 flex items-center justify-center p-2 rounded-lg">
                <p className="text-[#F5F5DC] text-center font-serif text-sm">{suspect.comment}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

export default UsualSuspects
