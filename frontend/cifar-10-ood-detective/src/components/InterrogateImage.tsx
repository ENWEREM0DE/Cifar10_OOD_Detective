import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Search, Camera, AlertTriangle } from 'lucide-react'

const InterrogateImage = () => {
  const [image, setImage] = useState<string | null>(null)
  const [prediction, setPrediction] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isOOD, setIsOOD] = useState(false)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    setImage(URL.createObjectURL(file))
    handleUpload(file)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  const handleUpload = async (file: File) => {
    setIsLoading(true)
    setPrediction(null)
    setIsOOD(false)

    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch('http://127.0.0.1:8000/predict', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()
      setPrediction(data.prediction)
      setIsOOD(data.isOOD)
    } catch (error) {
      console.error('Error classifying image:', error)
      setPrediction('Error occurred while classifying the image.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section id="interrogate" className="my-8 bg-[#1A1A2E] p-6 rounded-lg shadow-md border border-[#FFD700]">
      <h2 className="font-serif text-4xl font-bold text-[#FFD700] mb-6 flex items-center">
        <Search className="mr-2" />
        Interrogate an Image
      </h2>
      <div
        {...getRootProps()}
        className={`border-2 border-dashed border-[#FFD700] rounded-lg p-8 text-center cursor-pointer transition-all duration-300 ${
          isDragActive ? 'bg-[#FFD700] bg-opacity-10' : ''
        }`}
      >
        <input {...getInputProps()} />
        <p className="text-[#F5F5DC] font-serif text-xl mb-4">Drop your image here, detective!</p>
        <Camera className="mx-auto text-[#FFD700] w-16 h-16 mb-4" />
        <p className="text-[#F5F5DC] font-serif text-lg">
          {isDragActive ? "The detective is ready to investigate!" : "Drag and drop your image here or click to upload"}
        </p>
      </div>
      <button
       onClick={() => (document.querySelector('input[type="file"]') as HTMLInputElement)?.click()}
       className="mt-4 bg-[#FFD700] text-[#1A1A2E] font-serif text-lg font-bold py-2 px-4 rounded-full hover:bg-[#800020] hover:text-[#F5F5DC] transition-colors duration-300 flex items-center justify-center">
        <Camera className="mr-2" />
        Upload Image
      </button>
      {isLoading && (
        <div className="mt-8 text-center">
          <Search className="animate-spin text-[#FFD700] w-12 h-12 mx-auto mb-4" />
          <p className="text-[#F5F5DC] font-serif text-xl">Investigating the evidence...</p>
        </div>
      )}
      {image && prediction && (
        <div className="mt-8 bg-white bg-opacity-10 p-6 rounded-lg border border-[#FFD700] animate-fade-in">
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/2 mb-4 md:mb-0 md:mr-4">
            <img
                src={image}
                alt="Uploaded image"
                width={300}
                height={300}
                style={{ objectFit: 'contain'}}
                className="rounded-lg border-2 border-[#FFD700]"
              />
            </div>
            <div className="w-full md:w-1/2 bg-[#1A1A2E] p-4 rounded-lg border border-[#FFD700] relative">
              <div className="absolute -top-3 -left-3 bg-[#FFD700] text-[#1A1A2E] font-serif font-bold py-1 px-3 rounded-full">
                Case File
              </div>
              <h3 className="font-serif text-2xl font-bold mb-2 text-[#FFD700]">Detective's Notes:</h3>
              <p className={`font-serif text-xl ${isOOD ? 'text-[#800020]' : 'text-[#FFD700]'}`}>
                {isOOD ? (
                  <>
                    <AlertTriangle className="inline-block mr-2" />
                    {prediction}!
                  </>
                ) : (
                  <>
                    <Search className="inline-block mr-2" />
                    {prediction}.
                  </>
                )}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default InterrogateImage