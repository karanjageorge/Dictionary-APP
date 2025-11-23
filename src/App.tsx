import { useState } from "react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Spinner } from "./components/ui/spinner";
import { toast } from "sonner";
import useDictionaryQuery from "./hooks/UseDictionary";

function App() {
  const [word, setWord] = useState("");

  const { data, isFetching, refetch, isError } = useDictionaryQuery(word);

  const handleSearch = () => {
    if (!word.trim()) {
      toast.error("Please enter a word");
      return;
    }
    refetch();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-xl space-y-6">
        {/* Title */}
        <h1 className="text-2xl font-bold text-center">Dictionary App</h1>

        <div className="flex gap-2">
          <Input
            placeholder="Enter a word..."
            value={word}
            onChange={(e) => setWord(e.target.value)}
          />
          <Button onClick={handleSearch} disabled={isFetching}>
            Search
          </Button>
        </div>

        {isFetching && (
          <div className="flex justify-center">
            <Spinner className="h-6 w-6" />
          </div>
        )}

        {isError && (
          <p className="text-red-500 text-center">
            Word not found. Try another one.
          </p>
        )}

        {data && !isFetching && !isError && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">{data[0].word}</h2>

            {data[0].phonetic && (
              <p className="text-gray-600">{data[0].phonetic}</p>
            )}

            <div>
              <h3 className="font-medium text-lg">Meaning:</h3>
              <p className="text-gray-700">
                {data[0].meanings[0].definitions[0].definition}
              </p>
            </div>

            {data[0].meanings[0].definitions[0].example && (
              <div>
                <h3 className="font-medium text-lg">Example:</h3>
                <p className="text-gray-700 italic">
                  "{data[0].meanings[0].definitions[0].example}"
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
