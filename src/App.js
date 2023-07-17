import React, { useState } from "react";
import FancyAutoComplete from "./FancyAutoCompelte";
import Cars24_folderStructure from './Cars24_folderStructure'
import schema from './folderSchema'
const components = [
  {
    title: "FancyAutoCompelte",
    challenge:
      "Implement an autocomplete feature for a text input field using JavaScript. The autocomplete should provide suggestions when the user types the @ symbol",
    tags: ["Flipkart", "Google"],
    component: FancyAutoComplete
  },
  {
    title: "Folder Structure",
    challenge:
      "Implement a folder-like structure in a React application, allowing users to navigate and interact with a hierarchical folder system. The challenge involves creating components and functionality to display and manipulate folders and files within the structure.",
    tags: ["Cars24", "Meesho"],
    component: Cars24_folderStructure
  },
  // Add more objects for other components
];

function App() {
  const [selectedComponent, setSelectedComponent] = useState("");

  const handleComponentClick = (title) => {
    setSelectedComponent(title);
  };

  const renderComponent = () => {
    const selectedObj = components.find((c) => c.title === selectedComponent);
    if (selectedObj) {
      const Component = selectedObj.component;
      return (
        <div>
          <h1>{selectedObj.title}</h1>
          <h3>Challenge:</h3>
          <p>{selectedObj.challenge}</p>
          <Component item={schema} tags={selectedObj.tags} />
        </div>
      );
    }
    return null;
  };
   

  return (
    <div className="App">
      <div className="component-list">
        {components.map((component) => (
          <h2
            key={component.title}
            style={{ cursor: "pointer" }}
            onClick={() => handleComponentClick(component.title)}
          >
            {component.title}
          </h2>
        ))}
      </div>

      <div className="component-details">
        {renderComponent()}
      </div>
    </div>
  );
}

export default App;

import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Button, ScrollView, StyleSheet ,AppState, AppStateStatic, Platform} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { log, set } from 'react-native-reanimated';
import Sound from 'react-native-sound';
import AppLogo from './AppLogo';
import Slider from '@react-native-community/slider';
import { Colors } from '../theme';
import Theme, { ThemeType } from '../reducers/Theme';
import { useSelector } from 'react-redux';
import { RootState } from '../reducers';

export interface SoundProps {
    url: string,
    shouldStopAudio:boolean,
    onPlayAudio:Function
}



type AppStateType="background"|"active";
export function AudioPlayer({ url,shouldStopAudio ,onPlayAudio}: SoundProps) {
  /**
     * Theme 
     */
   const Theme: ThemeType = useSelector((state: RootState) => state.theme);
   const { secondary_color, text_color, bg_color, brand_name, button_text_color, primary_color, profile_bg, text_color_on_primary_color, profile_icon } = Theme;
   //End
   const appState = useRef<string>(AppState.currentState);
   const [appStateVisible, setAppStateVisible] = useState(appState.current);
   
    const [sound, setSound] = useState(null);
    const [duration, setDuration] = useState(0);

    const [currentTime, setCurrentTime] = useState(0);

    const [isPLaying, setPlaying] = useState(false);
    const [intervalId,setTimerId]=useState();

   // url = "https://www.kozco.com/tech/LRMonoPhase4.wav";

    //console.log("AudioPlayer",sound);
    const tolerance =0.20; // Adjust the tolerance value as needed

     
     useEffect(() => {


        try {
            
         
        const roundCurrent=Math.round(duration - currentTime)

 
         if(!sound)return;

        if ((roundCurrent<=tolerance || Math.abs(currentTime - duration) <= tolerance) && isPLaying) {
             soundControl("stop")
          }
          
        } catch (error) {
            
        }
            
    }, [currentTime, sound,isPLaying]);


    useEffect(()=>{

        //if(!sound)return;

 
        if(shouldStopAudio && sound?.isPlaying() ){
            soundControl("stop")
           
        }

    },[shouldStopAudio])
 
    React.useEffect(() => {

        try {
            
       
        if (!url || url?.length < 0) return;

        const sound = new Sound(url, null, (error) => {
            if (error) {
            } else {
                // do something
                const duration = sound._duration ? sound._duration : 0
                setDuration(duration);
                
                if(sound){
                //console.log("setPlaying",sound.getCurrentTime((seconds) => console.log('playing second' + seconds)))
                sound.getCurrentTime((seconds,isPlaying) => {
                
                    setCurrentTime(seconds)
                })
                }

            }

        });
        setSound(sound);
        // setTime();
        let subscription;
       const appMinimizeHandleInAndroid=()=>{

        if(Platform.OS!=="android")return;

          subscription = AppState.addEventListener('change', nextAppState => {
            if (
              appState.current.match(/inactive|background/) &&
              nextAppState === 'active'
            ) {
              console.log('App has come to the foreground!');
            }
      
          const appState_=  appState.current = nextAppState;

             if(appState_=="background"){
                
                  
                 const isPlay=sound.isPlaying();
                if(isPLaying || isPlay){
                   
                setPlaying(false);
                clearTimer();
                sound.pause();
                 

                }
                
             }
            // setAppStateVisible(appState.current);
            // console.log('AppState', appState.current);
          });
       }
       appMinimizeHandleInAndroid();
        // setSound(sound);

        
        return () => {
              sound?.release()
              clearTimer();
             subscription?.remove();
             };

            } catch (error) {
            
            }
    }, [])


    // useEffect(()=>{

    //       console.log("appState.current",appState.current);
          
    //     if(appState.current=="background"){
    //         debugger
    //       soundControl("pause");
    //     }
 
    // },[appState])
     

 

    const setTime=()=>{

        
        const intervalId = setInterval(() => {
           
           handleTimer();
             
        }, 300);

 
         setTimerId(intervalId);
    }

    const clearTimer=()=>{

        setTimerId((id)=>{
             clearInterval(id);
            return id;

        })
    }


    const  handleTimer=()=>{


        setTimerId((id)=>{
             return id;
        })
       
      if(sound){
        sound.getCurrentTime((seconds) => {
            setCurrentTime(seconds);
            })
      }
      
    }
    const soundControl = (action: "start" | "stop"|"pause") => {

  
        // if(action=="pause"){
        //      debugger
        // console.log("CHECKING",sound,"----",action)
        // }
         

        try {
            
       
         if (sound == null || !sound) return;
 

        switch (action) {

            case "start": {
                if(currentTime>0){
                    sound.setCurrentTime(currentTime);
                }
                sound.play();
                setPlaying(true)
                setTime();
                break;
            }
            case "stop": {
                setPlaying(false)
                clearTimer();
                setCurrentTime(0); 
                sound.stop()
                sound.setCurrentTime(0)
                break;
            }
            case "pause":{
                setPlaying(false);
                clearTimer();
                sound.pause();
            }

        }
    } catch (error) {
            
    }

    }
 
 
    const renderPlayButton = () => {
        return (<TouchableOpacity
            style={{ borderColor: 'red', justifyContent: 'center', padding: 10 }}
            onPress={() => {
                soundControl("start")
                onPlayAudio();
            }}
        >

            <AppLogo logo="Play" />

        </TouchableOpacity>)
    }
    const renderStopButton = () => {
        return (<TouchableOpacity
            onPress={() => soundControl("pause")}
            style={{ borderColor: 'red', justifyContent: 'center', padding: 10 }}
        >
            <AppLogo logo="Stop" />

        </TouchableOpacity>)
    }


    const handleSliderChange = (value) => {

        try {
      
         if(Math.abs(value-duration)<tolerance){
          //  setCurrentTime(0)
            return;
        };

        setCurrentTime(value);
       
        if(sound){
            sound.setCurrentTime(value);
        }
               
    } catch (error) {
            
    }
 
    };
 
    return (

        <View style={{ flexDirection: 'row',  width: 180 }}>
            {
                isPLaying ? (renderStopButton()) : (renderPlayButton())

            }

            <View 
            style={{flex:1,position:'relative',flexDirection:'row'}}
            >
           <View
           style={{flex:1,justifyContent:'center'}}>
           <Slider
      minimumValue={0}
      maximumValue={duration}
      value={currentTime}
      onValueChange={handleSliderChange}
      minimumTrackTintColor={Colors.APP_PRIMARY_COLOR}
      maximumTrackTintColor={"grey"}
      thumbTintColor={"black"}
    />
           </View>
       <View style={{justifyContent:'center'}}>
       <Text style={{fontSize:10}}> {getMinfromSecond(duration)}</Text>
       </View>
            </View>
             
        </View>
    );
}
 

const getMilliSecond=(sec:number)=>{

    if(!sec)return 0;

     return sec * 1000;
}
const getMinfromSecond=(seconds:number)=>{
    
    
        const format = val => `0${Math.floor(val)}`.slice(-2)
        const hours = seconds / 3600
        const minutes = (seconds % 3600) / 60
      
        return [ minutes, seconds % 60].map(format).join(':')
      
}
