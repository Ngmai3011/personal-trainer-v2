import "./Calendar.css";
import {useEffect, useState, createContext} from "react";

export const TrainingContext = createContext({
  data: [],
  refetch: () => {},
});

const TrainingProvider = ({children}) => {
  const [data, setData] = useState([]);

  const getTrainings = async () => {
    const response = await fetch(
      "https://traineeapp.azurewebsites.net/gettrainings"
    )
      .then((response) => response.json())
      .catch((err) => console.error(err));

    setData(response);
  };
  useEffect(() => {
    getTrainings();
  }, []);

  return (
    <TrainingContext.Provider
      value={{
        data,
        refetch: getTrainings,
      }}>
      {children}
    </TrainingContext.Provider>
  );
};

export default TrainingProvider;
