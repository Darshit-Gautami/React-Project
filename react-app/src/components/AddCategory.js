import React, { useState, useEffect } from "react";
import { Grid, TextField, withStyles,FormControl, InputLabel, Select, MenuItem, Button, FormHelperText } from "@material-ui/core";
import useForm from "./useForm";
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { connect } from "react-redux";
import * as actions from "../actions/dCategory";
import { useToasts } from "react-toast-notifications";
const styles = theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            minWidth: 230,
        }
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 230,
    },
    smMargin: {
        margin: theme.spacing(1)
    }
})

const initialFieldValues = {
    name: '',
    IsActive: 0,
    description: ''
}

const DUserForm = ({ classes, ...props }) => {

    //toast msg.
    const { addToast } = useToasts()

    //validate()
    //validate({fullName:'jenny'})
    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('name' in fieldValues)
            temp.name = fieldValues.name ? "" : "This field is required."
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
        handlecheckedchange,
        resetForm
    } = useForm(initialFieldValues, validate, props.setCurrentId)

    //material-ui select
    const [currentId, setCurrentId] = useState(0)
    // const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(0);
    // React.useEffect(() => {
    //     setLabelWidth(inputLabel.current.offsetWidthnp,);
    // }, []);

    const handleSubmit = e => {
        debugger
        e.preventDefault()
        if (validate()) {
            const onSuccess = () => {
                resetForm()
                addToast("Submitted successfully", { appearance: 'success' })
            }
            if (props.currentId === 0)
                props.createDUser(values, onSuccess)
            else
                props.updateDUser(props.currentId, values, onSuccess)
        }
    }

    useEffect(() => {
        if (props.currentId !== 0) {
            setValues({
                ...props.dUserList.find(x => x.id === props.currentId)
            })
            setErrors({})
        }
    }, [props.currentId])

    return (
        <form autoComplete="off" noValidate className={classes.root} onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={8}>
                    <TextField
                        name="name"
                        label="Category Name"
                        value={values.name}
                        onChange={handleInputChange}
                        {...(errors.name && { error: true, helperText: errors.name })}
                    />
                    <TextField
                        name="description"
                        label="Description"
                        value={values.description}
                        onChange={handleInputChange}
                    />
                     <FormControlLabel
                        value="top"
                        control={ <Checkbox
                        color="primary" 
                        name="isActive"
                        checked={values.isActive == 1 ? true: false}
                        value={values.isActive}
                        onChange={handlecheckedchange}/>}
                        label="Is Active"
                        labelPlacement="top"
                        />
                    </Grid>
                <Grid item xs={4}>
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
  dUserList: state.dCategory.list
})

const mapActionToProps = {
    createDUser: actions.create,
    updateDUser: actions.update
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(DUserForm));