import React, {useState,useEffect} from "react";
import { Grid, TextField, withStyles,FormControl, InputLabel, Select, MenuItem, Button, FormHelperText } from "@material-ui/core";

function FormInput(props) {
  const [name] = useState(props.name)
  const [label] = useState(props.label)
  const [search, setSearch] = useState("");
  const [data]= useState([]);
  const [filteredData, setFilteredData] = useState([]);   

  useEffect(() => {
    setFilteredData(
      filteredData.filter(country =>
          country.name.toLowerCase().includes(search.toLowerCase())
        )
      );
  }, [search, filteredData])

  return (
    <TextField
            name={name}
            label={label}
            onChange={e => setSearch(e.target.value)}
    />
  );
}
export default FormInput