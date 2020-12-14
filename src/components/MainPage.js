import React, { Component } from 'react';
import Analize from './Analize';
import Page1 from './Pages/Page1/Page1';
import Page2 from './Pages/Page2/Page2';
import Page3 from './Pages/Page3/Page3';
import Page4 from './Pages/Page4/Page4';
import Page5 from './Pages/Page5/Page5';
import SoilClass1975 from './Pages/Page6/SoilClass1975';
import SoilClass2018 from './Pages/Page6/SoilClass2018';
import Page7 from './Pages/Page7/Page7';
import Page8 from './Pages/Page8/Page8';
import Page9 from './Pages/Page9/Page9';
import Page10 from './Pages/Page10/Page10';

export class MainPage extends Component {
  state = {
    step: 1,
    constractionYear:0 
  };

  // Proceed to next step
  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1
    });
  };

  // Go back to prev step
  prevStep = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1
    });
  };

  // Handle fields change
  handleChange = input => e => {
    this.setState({ [input]: e.target.value });
  };

  render() {
    const { step } = this.state;
    const {longitude, latitude, soilClass, location, skor, buildingLayout, locationOfBuilding,Ss,S1, constructionYear,numberOfStory,damageInfo } = this.state;
    const values = {longitude, latitude, soilClass, location, skor, buildingLayout,Ss,S1, constructionYear,numberOfStory,damageInfo };

    switch (step) {
        case 1:      //Binanın Konumu
          return (
            <Page1
              nextStep={this.nextStep}
              prevStep={this.prevStep}
              handleChange={this.handleChange}
              values={values}
            />  
          );
        case 2:       //Binanın Yapım Yılı
        return (
          <Page2
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
          />
          
        );
        case 3:        //Binanın Katsayısı
        return (
          <Page3
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
          />  
        );
        case 5:      //Hasar Durumu
        return (
          <Page4
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
          />  
        );
        case 6:     //Yapılaşma Tipi
        return (
          <Page5  
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
          />  
        );
        case 4:     //Zemin Sınıfı
        if (constructionYear < 1998 && constructionYear >= 1975){
        return (
          <SoilClass1975
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
          />  
        );
        }else if(constructionYear >= 2018){
          return (
            <SoilClass2018
              nextStep={this.nextStep}
              prevStep={this.prevStep}
              handleChange={this.handleChange}
              values={values}
            />  
          );
          }else {
            return (
              <SoilClass2018
                nextStep={this.nextStep}
                prevStep={this.prevStep}
                handleChange={this.handleChange}
                values={values}
              />  
            );
          }
        case 7:     // Analiz Sayfası
        return (
          <Analize
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            values={values}
          />
        );
        
        
      
      }
     
  }
}

export default MainPage;
