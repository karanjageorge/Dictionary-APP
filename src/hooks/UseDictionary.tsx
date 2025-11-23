import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const fetchWord = async (word: string) => {
  const { data } = await axios.get(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`,
  );
  return data;
};

const useDictionaryQuery = (word: string) => {
  return useQuery({
    queryKey: ["dictionary", word],
    queryFn: () => fetchWord(word),
    enabled: false,
    retry: 1,
  });
};

export default useDictionaryQuery;
