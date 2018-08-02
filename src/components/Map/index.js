import React, { Component } from "react"
import { Polygon, GoogleMap, withScriptjs, withGoogleMap, Marker } from "react-google-maps"
import FenceIcon from '../../assets/location.png'
import BlockedFenceIcon from '../../assets/fence.png'
import OpenFenceIcon from '../../assets/fence-open.png'
import ClosedFenceIcon from '../../assets/fence-close.png'
import mapStyles from './style.js'
import { Modal, Row, Col } from 'antd';


const MyMapComponent = withScriptjs(withGoogleMap((props) =>
    <GoogleMap
        defaultZoom={14}
        defaultCenter={{ lat: 21.416017, lng: 39.892154 }}
        options={{ styles: mapStyles }}
    >
        {props.children}
    </GoogleMap>
))

class Map extends Component {
    state = { modalOpen: false, selectedMarker: null, barriersState: [1, 0, 0, 1, -1, 1, 0, 0] }

    openModal = () => this.setState({ modalOpen: true })

    toggleBarrier = index => () => {
        const states = [].concat(this.state.barriersState)
        states[index] = states[index] !== -1 ? -1 : 0
        this.setState({ barriersState: states })
    }
    getRandomInt = (max) => {
        return Math.floor(Math.random() * Math.floor(max));
    }

    componentWillMount() {
        setInterval(() => {
            const randomBarrier = this.getRandomInt(this.state.barriersState.length);
            const states = [].concat(this.state.barriersState)
            console.log(randomBarrier)
            if (this.state.barriersState[randomBarrier] !== -1) {
                states[randomBarrier] = this.getRandomInt(2)
                this.setState({ barriersState: states })
            }
        }, 300)
    }

    render() {
        return (
            <div>
                <Modal
                    title="Barrier details"
                    visible={this.state.modalOpen}
                    width={'fit-content'}
                    cancelText={'Cancel'}
                    okText={'Done'}
                    onCancel={() => this.setState({ modalOpen: false })}
                    onOk={() => this.setState({ modalOpen: false })}
                >
                    <Row style={{ display: '-webkit-box' }}>
                        {
                            this.state.barriersState.map((barrier, index) =>
                                <div key={index} style={{ width: '100px', textAlign: 'center', cursor: 'pointer' }}>
                                    <span style={{ fontSize: 20 }}>{index + 1}</span>
                                    <img
                                        onClick={this.toggleBarrier(index)}
                                        style={{ marginTop: '-20px' }}
                                        src={
                                            barrier === -1 ? BlockedFenceIcon :
                                                barrier ? OpenFenceIcon : ClosedFenceIcon}
                                        width={100} />
                                </div>
                            )
                        }
                    </Row>
                </Modal>

                <MyMapComponent
                    isMarkerShown
                    googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyDLHhE48HvQ6B3407JD41rZwFa_tnf5ppc"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `400px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                >
                    <Marker onClick={this.openModal} zIndex={101} position={{ lat: 21.423785, lng: 39.893493 }} icon={FenceIcon} />
                    <Marker onClick={this.openModal} zIndex={101} position={{ lat: 21.420980, lng: 39.893824 }} icon={FenceIcon} />

                    {/* regions */}
                    <Polygon
                        label={'region-1'}
                        options={{
                            strokeColor: '#039be5', strokeWeight: 2,
                            fillColor: '#039be5', fillOpacity: 0.5
                        }}
                        zIndex={100}
                        path={[
                            { lat: 21.423790, lng: 39.893435 },
                            { lat: 21.421059, lng: 39.893759 },
                            { lat: 21.420935, lng: 39.893674 },
                            { lat: 21.420671, lng: 39.892750 },
                            { lat: 21.420832, lng: 39.892531 },
                            { lat: 21.421661, lng: 39.892254 },
                            { lat: 21.422269, lng: 39.892174 },
                            { lat: 21.422838, lng: 39.892202 },
                            { lat: 21.423184, lng: 39.892196 },
                            { lat: 21.423690, lng: 39.892397 },
                            { lat: 21.423790, lng: 39.893435 }
                        ]}
                    />

                    <Polygon
                        label={'region-2'}
                        options={{
                            strokeColor: '#2ecc71', strokeWeight: 2,
                            fillColor: '#2ecc71', fillOpacity: 0.5
                        }}
                        zIndex={100}
                        path={[
                            { lat: 21.423841, lng: 39.893513 },
                            { lat: 21.423976, lng: 39.894988 },
                            { lat: 21.423338, lng: 39.895063 },
                            { lat: 21.423177, lng: 39.894983 },
                            { lat: 21.421601, lng: 39.895146 },
                            { lat: 21.421341, lng: 39.894985 },
                            { lat: 21.420959, lng: 39.893847 },
                            { lat: 21.423841, lng: 39.893513 }
                        ]}
                    />


                    {/* Mouaim */}
                    <Polygon
                        label={'region-3'}
                        options={{
                            strokeColor: '#039be5', strokeWeight: 2,
                            fillColor: '#039be5', fillOpacity: 0.5
                        }}
                        zIndex={100}
                        path={[
                            { lat: 21.423790, lng: 39.893435 },
                            { lat: 21.421059, lng: 39.893759 },
                            { lat: 21.420935, lng: 39.893674 },
                            { lat: 21.420671, lng: 39.892750 },
                            { lat: 21.420832, lng: 39.892531 },
                            { lat: 21.421661, lng: 39.892254 },
                            { lat: 21.422269, lng: 39.892174 },
                            { lat: 21.422838, lng: 39.892202 },
                            { lat: 21.423184, lng: 39.892196 },
                            { lat: 21.423690, lng: 39.892397 },
                            { lat: 21.423790, lng: 39.893435 }
                        ]}
                    />


                    {/* /regions */}


                    <Polygon
                        options={{
                            strokeColor: '#fff', strokeWeight: 2,
                            fillColor: '#fff', fillOpacity: 0.2
                        }}
                        path={[
                            { lat: 21.426493, lng: 39.869610 },
                            { lat: 21.425455, lng: 39.872271 },
                            { lat: 21.426533, lng: 39.873558 },
                            { lat: 21.424935, lng: 39.876348 },
                            { lat: 21.420621, lng: 39.882141 },
                            { lat: 21.421939, lng: 39.882957 },
                            { lat: 21.420467, lng: 39.887047 },
                            { lat: 21.418030, lng: 39.888162 },
                            { lat: 21.416462, lng: 39.890286 },
                            { lat: 21.416872, lng: 39.891427 },
                            { lat: 21.418706, lng: 39.891038 },
                            { lat: 21.419236, lng: 39.892619 },
                            { lat: 21.423000, lng: 39.891453 },
                            { lat: 21.425822, lng: 39.891193 },
                            { lat: 21.428813, lng: 39.894977 },
                            { lat: 21.426642, lng: 39.897024 },
                            { lat: 21.426015, lng: 39.898553 },
                            { lat: 21.428379, lng: 39.900263 },
                            { lat: 21.427511, lng: 39.902544 },
                            { lat: 21.425050, lng: 39.906819 },
                            { lat: 21.419912, lng: 39.904643 },
                            { lat: 21.412819, lng: 39.906301 },
                            { lat: 21.407922, lng: 39.907908 },
                            { lat: 21.404814, lng: 39.903917 },
                            { lat: 21.404803, lng: 39.900774 },
                            { lat: 21.401527, lng: 39.895622 },
                            { lat: 21.402273, lng: 39.894868 },
                            { lat: 21.404716, lng: 39.888522 },
                            { lat: 21.407494, lng: 39.886622 },
                            { lat: 21.409103, lng: 39.885035 },
                            { lat: 21.413519, lng: 39.876239 },
                            { lat: 21.416488, lng: 39.873945 },
                            { lat: 21.421313, lng: 39.867411 },
                            { lat: 21.426493, lng: 39.869610 },
                        ]}
                    />
                </MyMapComponent>
            </div>
        )
    }
}

export default Map