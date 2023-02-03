import React, {useContext, useState} from 'react'
import ky from 'ky'
import { useLocation, useNavigate } from 'react-router-dom'
import { 
    Grid,
    TextField,
    FormControlLabel,
    FormControl,
    FormLabel,
    RadioGroup,
    Radio,
    Select,
    MenuItem,
    Button,
    Paper
} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditInfo = () => {

    const location = useLocation()
    const navigate = useNavigate()
    const item = location.state

    const [formValues, setFormValues] = useState({
        name: item.name,
        email: item.email,
        gender: item.gender,
        status: item.status,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
        ...formValues,
        [name]: value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            await ky.put(`https://gorest.co.in/public/v2/users/${item.id}?access-token=7cb572f6fa7b748599a3987a766925ae734aeeb5e47cdc75b170e1077de8683b`, {json: formValues})
                .then(response => {
                    if(response.ok){
                        toast.success(response.status, {
                            position: "top-right",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
                        setTimeout(() => {
                            navigate(-1)
                        }, [3000])
                    }
                })
        } catch (error) {
            toast.error(error.message, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            setTimeout(() => {
                navigate(-1)
            }, [3000])
        }

    };

  return (
    <>
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
        />
        <Paper sx={{height: '500px', display: 'flex', justifyContent: 'center', placeItems: 'center'}}>
            <form onSubmit={handleSubmit}>
            <Grid container alignItems="center" justify="center" direction="column" gap="20px">
                <Grid item>
                <TextField
                    id="name-input"
                    name="name"
                    label="Name"
                    type="text"
                    value={formValues.name}
                    onChange={handleInputChange}
                />
                </Grid>
                <Grid item>
                <TextField
                    id="age-input"
                    name="email"
                    label="Email"
                    type="text"
                    value={formValues.email}
                    onChange={handleInputChange}
                />
                </Grid>
                <Grid item>
                <FormControl>
                    <FormLabel>Status</FormLabel>
                    <RadioGroup
                    name="status"
                    value={formValues.status}
                    onChange={handleInputChange}
                    row
                    >
                    <FormControlLabel
                        key="active"
                        value="active"
                        control={<Radio size="small" />}
                        label="Active"
                    />
                    <FormControlLabel
                        key="inactive"
                        value="inactive"
                        control={<Radio size="small" />}
                        label="Inactive"
                    />
                    </RadioGroup>
                </FormControl>
                </Grid>
                <Grid item>
                <FormControl>
                    <Select
                    name="gender"
                    sx={{
                        width: '150px'
                    }}
                    value={formValues.gender}
                    onChange={handleInputChange}
                    >
                    <MenuItem key="male" value="male">
                        Male
                    </MenuItem>
                    <MenuItem key="female" value="female">
                        Female
                    </MenuItem>
                    </Select>
                </FormControl>
                </Grid>
                <Button variant="contained" color="primary" type="submit">
                Submit
                </Button>
            </Grid>
            </form>
        </Paper>
    </>
  )
}

export default EditInfo