import React, { Component } from 'react';
import { ListItem, ListItemText } from '@material-ui/core/';
import Button from '@material-ui/core/Button';
import './analize.css';
import data from './data.json'
import BarChart from './Charts'

export class Analize extends Component {

  state = {
    step:1,
    codesYear: 0,
    seismicZone:0,
    cZero:0,
    period:0,
    tZero:0,
    I:1,
    K:0.8,
    S:0,
    C:0,
    longitude:0,
    latitude:0,
    FsCoff:0,
    F1Coff:0,
    sAe:0,
    sAr:0,
    aa:0,
    bb:0

    
  };

  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  

  codes = () => {
    const { values: {constructionYear}} = this.props;

    if (constructionYear >= 2019){
      this.setState({
        codesYear : '2018 Deprem Yönetmeliği'
      });
      this.analize2018();
    } else if (constructionYear < 2019 && constructionYear >= 2007){
      this.setState({
        codesYear : '2007 Deprem Yönetmeliği'
      });
    }else if (constructionYear < 2007 && constructionYear >= 1998){
      this.setState({
        codesYear : '1998 Deprem Yönetmeliği'
      });
      return this.state;
    }else if (constructionYear < 1998 && constructionYear >= 1975){
      this.analize1975();
      this.analize2018();
      this.setState({
        codesYear : '1975 Deprem Yönetmeliği'
      }); 
    }
    

  };

  seismicZone = () => {
    const { values: {location}} = this.props;
    if (location == 'yalova'){
      this.setState({
        seismicZone:1,
        cZero:0.1
      })
    }if (location == 'istanbul'){
      this.setState({
        seismicZone:2,
        cZero:0.08
      })
    }if (location == 'ankara'){
      this.setState({
        seismicZone:3,
        cZero:0.06
      }) 
    }if (location == 'konya'){
      this.setState({
        seismicZone:4,
        cZero:0.03
      })
    }
  }

  analize1975 = () => {
    const { values: {location,numberOfStory}} = this.props;
    const {step, period,tZero,K,I}=this.state;
    switch (step) {
      
      case 1:
          var t0;
          const { values: {soilClass}} = this.props;
          if (soilClass == 0){
            t0=0.6
          }else if (soilClass == 1){
            t0=0.25
          }else if (soilClass == 2){
            t0=0.42
          }else if (soilClass == 3){
            t0=0.6
          }else if (soilClass == 4){
            t0=0.9
          }
        this.setState({
          step: 4,
          tZero:t0
        })
      case 2:
        var c0;
        if (location == 'yalova'){
          c0=0.1;
          this.setState({
            seismicZone:1
          })
        }if (location == 'istanbul'){
          c0=0.08
          this.setState({
            seismicZone:2  
          })
        }if (location == 'ankara'){
          c0=0.06
          this.setState({
            seismicZone:3  
          }) 
        }if (location == 'konya'){
          c0=0.03
          this.setState({
            seismicZone:4 
          })
        }
        this.setState({
          cZero:c0,
          step: 5
        })
      case 3:
        let P = numberOfStory*0.1;
        var x= (1/(0.8+P-t0));
        if (x > 1){
          var S=1;
        } else {
          S = x;
        }
        this.setState({
          S: S,
          step: 6,
          period:P
        }); 
      case 4:
        this.setState({
          C: c0*K*S*I         
        });
      }
  };

  analize2018 = () => {
    const { values: {longitude,latitude, soilClass, numberOfStory}} = this.props;

    const latitudeData = data[0].Latitude;
    const longitudeData = data[0].Longitude;
    const SShort = data[0].SShort;
    const SOne = data[0].SOne;
    const lengthData = data.length;
    var soilType = soilClass;
    var Fs;
    var F1;
    var i=0;
    var j=0;
    while (i < lengthData) {
      if(longitude >= data[i].Longitude ){
        
          if(latitude >= data[i].Latitude ){
            
            var ss = data[i].SShort;
            var s1 = data[i].SOne;
            var aa = data[i].Latitude;
            var bb = data[i+1].Latitude;
            var cc = data[i].Longitude;
            var dd = data[i+1].Longitude + 0.1;
            var ss1 = data[i].SShort;
            var ss2 = data[i+1].SShort;
            var s11 = data[i].SOne;
            var s12 = data[i+1].SOne
          
        }
      };
      i=i+1

      if (soilType == 'ZA' || soilType == 1){
        Fs = 0.8
      }else if (soilType == "ZB" || soilType == 2){
          Fs = 0.9
      }else if (soilType == "ZC" || soilType == 0 || soilType == 3){
          if (ss >= 0.25 && ss <=0.5){
              Fs = 1.3
            }else if (ss > 0.5 && ss <=0.75){
              Fs = 1.3+(ss-0.5)*(-0.1)/0.25
            }else if (ss > 0.75){
              Fs = 1.2
            }
      }else if (soilType == "ZD"){
        if (ss <= 0.25){
            Fs = 1.6
        }else if (ss >0.25 && ss <=0.50){
            Fs = 1.6 + (ss-0.25) * (-0.2)/0.25
        }else if (ss > 0.50 && ss <= 0.75){
          Fs = 1.4 + (ss - 0.50) * (-0.2) / 0.25
        }else if (ss > 0.75 && ss <= 1.00){
          Fs = 1.2 + (ss - 0.75) * (-0.1) / 0.25
        }else if (ss > 1.00 && ss <= 1.25){
          Fs = 1.1 + (ss - 1.00) * (-0.1) / 0.25
        }else if (ss > 1.25){
            Fs = 1.0
        }
      }else if (soilType == "ZE" || soilType == 4){
        if (ss <= 0.25){
          Fs = 2.4
        }else if (ss > 0.25 && ss <= 0.50){
          Fs = 2.4 + (ss - 0.25) * (-0.7) / 0.25
        }else if (ss > 0.50 && ss <= 0.75){
          Fs = 1.7 + (ss - 0.50) * (-0.4) / 0.25
        }else if (ss > 0.75 && ss <= 1.00){
          Fs = 1.3 + (ss - 0.75) * (-0.2) / 0.25
        }else if (ss > 1.00 && ss <= 1.25){
          Fs = 1.1 + (ss - 1.00) * (-0.2) / 0.25
        }else if (ss > 1.25 && ss <=1.5){
          Fs = 0.9 + (ss - 1.25) * (-0.1) / 0.25
        }else if (ss > 1.5){
          Fs = 0.8
        }
      }

      if (soilType == "ZA" || soilType == 1){
        F1 = 0.8
      }else if (soilType == "ZB" || soilType == 2){  
        F1 = 0.8
      }else if (soilType == "ZC" || soilType == 0 || soilType == 3){
        if (s1 <= 0.50){
            F1 = 1.5
        }else if (s1 > 0.5 && s1 <= 0.60){
            F1 = 1.5 + (s1 - 0.1) * (-0.1) / 0.10
        }else if (s1 > 0.60){
            F1 = 1.4
        }
      }else if (soilType == "ZD"){
        if (s1 <= 0.10){
          F1 = 2.4
        }else if (s1 > 0.10 && s1 <= 0.20){
          F1 = 2.4 + (s1 - 0.10) * (-0.2) / 0.10
        }else if (s1 > 0.20 && s1 <= 0.30){
          F1 = 2.2 + (s1 - 0.20) * (-0.2) / 0.10
        }else if (s1 > 0.30 && s1 <= 0.40){
          F1 = 2.0 + (s1 - 0.30) * (-0.1) / 0.10
        }else if (s1 > 0.40 && s1 <= 0.50){
          F1 = 1.9 + (s1 - 0.40) * (-0.1) / 0.10
        }else if (s1 > 0.50 && s1 <= 0.60){
          F1 = 1.8 + (s1 - 0.50) * (-0.1) / 0.10
        }else if (s1 > 0.60){
          F1 = 1.7
        }
      }else if (soilType == "ZE" || soilType == 4){
        if (s1 <= 0.10){
          F1 = 4.2
        }else if (s1 > 0.10 && s1 <= 0.20){
          F1 = 4.2 + (s1 - 0.10) * (-0.9) / 0.10
        }else if (s1 > 0.20 && s1 <= 0.30){
          F1 = 3.3 + (s1 - 0.20) * (-0.5) / 0.10
        }else if (s1 > 0.30 && s1 <= 0.40){
          F1 = 2.8 + (s1 - 0.30) * (-0.4) / 0.10
        }else if (s1 > 0.40 && s1 <= 0.50){
          F1 = 2.4 + (s1 - 0.40) * (-0.2) / 0.10
        }else if (s1 > 0.50 && s1 <= 0.60){
          F1 = 2.2 + (s1 - 0.50) * (-0.2) / 0.10
        }else if (s1 > 0.60){
          F1 = 2.0
        }
      }

      var sDs = ss*Fs
      var sD1 = s1*F1
      var tA = (0.2*sD1/sDs)
      var tB = (sD1/sDs)
      var tL = 6.0
      let height = numberOfStory*2.7
      var P = 0.07*(Math.pow(height, 0.75))
      var sAe


      if (P >= 0.0 && P < tA){
        sAe = (0.4+0.6*P/tA)*sDs
        
      }else if (P >= tA && P < tB){
        sAe = sDs
        
      }else if (P >= tB && P < tL){
        sAe = sD1/P
        
      }else if (P >= tL){
        sAe = sD1*tL /Math.pow(P, 2) 
      }
        
      const R = 4;
      const D = 2;
      const I = 1;
      var rA;




      if (P >= tB){
          rA = R/I
          
      }else if (P <= tB){
          rA = D+(R/I-D)*P/tB
      }
      
      var sAr = sAe/rA;



      this.setState({
        codesYear : '2018 Deprem Yönetmeliği',
        period: P,
        sAr:sAr,
        aa:aa,
        bb:bb,
        cc:cc,
        dd:dd

      });
    
    
      this.setState({
        
        FsCoff:Fs,
        F1Coff:F1,
        longitude:ss,
        latitude:s1,
        sAe:sAe
      })
    

  }

}
  

  render() {
    const { aa,bb,cc,dd,sAr, sAe, F1Coff, FsCoff, longitude, latitude, C, S, period, cZero, seismicZone, codesYear } = this.state;
    const { values: { soilClass, location,  S1, constructionYear,numberOfStory,damageInfo, buildingLayout}} = this.props;
    const values= {
      labels: ['1975', '2018'],
      datasets: [
        {
          label: 'Deprem Etkisi',
          backgroundColor: 'rgba(75,192,19,1)',
          borderColor: 'rgba(0,0,0,1)',
          borderWidth: 2,
          data: [100*C, 100*sAr]
        }
      ]
    }

    return (
      <div className="analize"><hr/> 
        <div className="skor">
          Geçerli Yönetmelik: {codesYear}<br/>
          C Katsayısı: {C.toFixed(3)}<br/>
          Sar:{sAr.toFixed(3)}<hr/>
          Yapılaşma Tipi:{buildingLayout}<br/>
          Hasar Durumu:{damageInfo}
{/*
          a:{aa}<br/>
          b:{bb}<br/>
          c:{cc}<br/>
          d:{dd}<br/>
          
          Co: {cZero}<br/>
          S: {S.toFixed(2)}<br/>
          Periyot: {period.toFixed(2)}<br/>
*/}  
         
          
          
          
          
        </div><hr/>
        
         
        <div style={{marginTop:"36px", width: "800px",height: "400px"}}>
          <BarChart values={values}></BarChart>
        </div>
        <br/>
        <Button
          color="secondary"
          variant="contained"
          onClick={this.back}
        >Back</Button>

        <Button
          color="primary"
          variant="contained"
          onClick={this.codes}
          

        >Analiz</Button>

      </div>  
    );
  }
}

export default Analize;
