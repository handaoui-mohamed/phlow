import React, { Component } from "react"
import { Polygon, GoogleMap, withScriptjs, withGoogleMap, Marker } from "react-google-maps"
import { Modal, Row } from 'antd';
import FenceIcon from '../../assets/location.png'
import BlockedFenceIcon from '../../assets/fence.png'
import OpenFenceIcon from '../../assets/fence-open.png'
import ClosedFenceIcon from '../../assets/fence-close.png'
import mapStyles from './style.js'

// data
import markers from './data/markers.json'
import regions from './data/regions.json'
import mina from './data/mina.json'


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
    state = {
        barrierModalOpen: false,
        regionModalOpen: false,
        selectedMarker: null,
        selectedRegion: -1,
        barriersState: [1, 0, 0, 1, -1, 1, 0, 0]
    }

    openBarrierModal = () => this.setState({ barrierModalOpen: true })
    openRegionModal = index => () => this.setState({ regionModalOpen: true, selectedRegion: index })

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
            if (this.state.barrierModalOpen) {
                const randomBarrier = this.getRandomInt(this.state.barriersState.length);
                const states = [].concat(this.state.barriersState)
                console.log(randomBarrier)
                if (this.state.barriersState[randomBarrier] !== -1) {
                    states[randomBarrier] = this.getRandomInt(2)
                    this.setState({ barriersState: states })
                }
            }
        }, 300)
    }

    render() {
        return (
            <div>
                <Modal
                    title="Barrier details"
                    visible={this.state.barrierModalOpen}
                    width={'fit-content'}
                    cancelText={'Cancel'}
                    okText={'Done'}
                    onCancel={() => this.setState({ barrierModalOpen: false })}
                    onOk={() => this.setState({ barrierModalOpen: false })}
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

                <Modal
                    title="Region details"
                    visible={this.state.regionModalOpen}
                    width={'fit-content'}
                    cancelText={'Cancel'}
                    okText={'Done'}
                    onCancel={() => this.setState({ regionModalOpen: false })}
                    onOk={() => this.setState({ regionModalOpen: false })}
                >
                    {
                        this.state.selectedRegion > -1 &&
                        <div>
                            <p><b>Area : </b> {regions[this.state.selectedRegion].area} m² </p>
                            <p><b>Max population : </b> {regions[this.state.selectedRegion].max_population} people </p>
                            <p><b>Current population : </b> {regions[this.state.selectedRegion].current_population} people </p>
                        </div>
                    }
                </Modal>

                <MyMapComponent
                    isMarkerShown
                    googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyDLHhE48HvQ6B3407JD41rZwFa_tnf5ppc"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `400px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                >
                    {
                        markers.map((position, index) => (
                            <Marker key={index}
                                onClick={this.openBarrierModal} zIndex={101}
                                position={position} icon={FenceIcon} />
                        ))
                    }

                    {/* regions */}
                    <Polygon
                        options={{
                            strokeColor: '#fff', strokeWeight: 2,
                            fillColor: '#fff', fillOpacity: 0.2
                        }}
                        path={mina}
                    />

                    {
                        regions.map((region, index) => (
                            <Polygon
                                key={index}
                                label={region.name}
                                onClick={this.openRegionModal(index)}
                                options={region.options}
                                zIndex={100}
                                path={region.path}
                            />
                        ))
                    }
                    {/* /regions */}
                </MyMapComponent>
            </div>
        )
    }
}

export default Map