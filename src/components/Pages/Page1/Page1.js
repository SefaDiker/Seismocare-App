import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import './page1.css';

export class Page1 extends Component {
  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    const { values, handleChange } = this.props;
    return (
      
        <div className="Page1">
        <InputLabel style={{ fontSize:'20px'  }}>Konum seçiniz</InputLabel>

        <Select style={{marginBottom:'9px' }}
          placeholder="Binanızın konumunu seçiniz"
          onChange={handleChange('location')}
          defaultValue={values.location}
          fullWidth
          margin="normal"
        >
          <MenuItem value="" disabled>Kat sayısı</MenuItem>
          <MenuItem value={'istanbul'}>İstanbul</MenuItem>
          <MenuItem value={'ankara'}>Ankara</MenuItem>
          <MenuItem value={'yalova'}>Yalova</MenuItem>
          <MenuItem value={'konya'}>Konya</MenuItem>
          
          
        </Select><br/><br/>
         
          <InputLabel style={{ fontSize:'20px'  }}>Binanızın kordinatlarını giriniz</InputLabel>
            <TextField
              placeholder="Enlem"
              label="Enlem"
              onChange={handleChange('latitude')}
              defaultValue={values.latitude}
              margin="normal"
              fullWidth
            />
            <TextField
              placeholder="Boylam"
              label="Boylam"
              onChange={handleChange('longitude')}
              defaultValue={values.longitude}
              margin="normal"
              fullWidth
            />
            
            <Button
              color="primary"
              variant="contained"             
              onClick={this.continue}
            >Continue</Button>
          
        </div>
      
    );
  }
}

export default Page1;