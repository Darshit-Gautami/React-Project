import React, { useState, useEffect } from "react";
import { Grid, TextField, withStyles, FormControl, InputLabel, Select,MenuItem, Button, FormHelperText } from "@material-ui/core";
import useForm from "./useForm";
import { connect } from "react-redux";
import * as actions from "../actions/dProduct";
import * as actions1 from "../actions/dCategory";
import { useToasts } from "react-toast-notifications";
import UserList from "./SelectMultiple"; 
import Input from '@material-ui/core/Input';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';

const styles = theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            minWidth: 200,
        }
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 200,
    },
    smMargin: {
        margin: theme.spacing(1)
    }
})

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
 
];

const initialFieldValues = {
    name:'',
    category:'',
    selectedCat:[],
    cost:'',
    description:''
}

const DCandidateForm = ({ classes, ...props }) => {

    //toast msg.
    const { addToast } = useToasts()

    //validate()
    //validate({fullName:'jenny'})
    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('name' in fieldValues)
            temp.name = fieldValues.name ? "" : "This field is required."
       
        if ('cost' in fieldValues)
            temp.cost = fieldValues.cost ? "" : "This field is required."
        setErrors({
            ...temp
        })
        if (fieldValues === values)
            return Object.values(temp).every(x => x === "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFieldValues, validate, props.setCurrentId)

    //material-ui select
    const [currentId, setCurrentId] = useState(0)
    
    // const inputLabel = React.useRef(null);

    const[categoryList,setCategoryList] = useState([]);
    const[isLoading,setIsLoading] =useState(true);
    const [labelWidth, setLabelWidth] = React.useState(0);
    
    // React.useEffect(() => {
    //     setLabelWidth(inputLabel.current.offsetWidth);
    // }, []);

    const handleSubmit = e => {
        debugger
        e.preventDefault()
        if (validate()) {
            var cat=null;
            cat=values.selectedCat.join(', ');
            values.category = cat;
            const onSuccess = () => {
                resetForm()
                addToast("Submitted successfully", { appearance: 'success' })
            }
            if (props.currentId === 0)
                props.createDCandidate(values, onSuccess)
            else
                props.updateDCandidate(props.currentId, values, onSuccess)
        }
    }

    useEffect(() => {
        
        fetch(
                'http://localhost:60671/api/DCategory',
                {
                    method:"GET"
                }
            )
            .then(res => res.json())
            .then(response =>{
                setCategoryList(response);
                setIsLoading(false);
            })
            .catch(error => console.log(error));

        if (props.currentId !== 0) {
            debugger
            
            props.dCandidateList.map(function(records,index){
                if(records.id == props.currentId){
                    records.selectedCat = records.category.split(', ');    
                }
            })    
            
            setValues({
                ...props.dCandidateList.find(x => x.id === props.currentId),
            })
            setErrors({})
        }
    }, [props.currentId]);

    return (
        <form autoComplete="off" noValidate className={classes.root} onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={10}>
                    <TextField
                        name="name"
                        label="Product Name"
                        value={values.name }
                        onChange={handleInputChange}
                        {...(errors.fullName && { error: true, helperText: errors.fullName })}
                    />
                    {/* <UserList  {...({ currentId, setCurrentId })}/> */}
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-mutiple-checkbox-label">Category</InputLabel>
                        <Select
                        labelId="demo-mutiple-checkbox-label"
                        id="demo-mutiple-checkbox"
                        multiple
                        name="selectedCat"
                        value={values.selectedCat}
                        onChange={handleInputChange}
                        renderValue={(selected) => (typeof selected ==='string') ? selected:selected.join(', ')}
                        MenuProps={MenuProps}
                        >
                        {categoryList.map(function(records,index){
                            if(records.isActive == 1){
                             return(
                                <MenuItem key={records.name} value={records.name}>
                                    <ListItemText primary={records.name} />
                                    </MenuItem>
                            )}
                        })}                        
                        </Select>
                    </FormControl>  

                    
                     
                    <TextField
                        name="cost"
                        label="Cost"
                        value={values.cost}
                        onChange={handleInputChange}
                        {...(errors.cost && { error: true, helperText: errors.cost })}
                    />
                    <TextField
                        name="description"
                        label="Description"
                        value={values.description}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={2}>
                    <div>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            className={classes.smMargin}
                        >
                            Submit
                        </Button>
                        <Button
                            variant="contained"
                            className={classes.smMargin}
                            onClick={resetForm}
                        >
                            Reset
                        </Button>
                    </div>
                </Grid>
            </Grid>
        </form>
    );
}


const mapStateToProps = state => ({
    dCandidateList: state.dProduct.list,
})

const mapActionToProps = {
    createDCandidate: actions.create,
    updateDCandidate: actions.update
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(DCandidateForm));