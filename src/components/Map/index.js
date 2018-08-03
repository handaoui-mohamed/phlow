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
        defaultZoom={16}
        defaultCenter={{
            "lat": 21.420888,
            "lng": 39.873793
        }}
        options={{ styles: mapStyles }}
    >
        {props.children}
    </GoogleMap>
))

class Map extends Component {
    state = {
        barrierModalOpen: false,
        regionModalOpen: false,
        selectedMarker: -1,
        selectedRegion: -1,
        barriersState: [
            [1, 0, 0, 1, 0, 1, 0, 0],
            [1, 0, 0, 1, 0, 1, 0, 1],
            [1, 0, 0, 1, 0, -1, -1, -1],
            [1, 0, 0, 1, 0, 1, 0, -1]
        ]
    }

    openBarrierModal = index => () => this.setState({ barrierModalOpen: true, selectedMarker: index })
    openRegionModal = index => () => this.setState({ regionModalOpen: true, selectedRegion: index })

    toggleBarrier = (rowIndex, index) => () => {
        const states = [].concat(this.state.barriersState)
        const rowStates = [].concat(this.state.barriersState[rowIndex])
        rowStates[index] = rowStates[index] !== -1 ? -1 : 0
        states[rowIndex] = rowStates
        this.setState({ barriersState: states })
    }

    getRandomInt = (min = 0, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    componentWillMount() {
        setInterval(() => {
            if (this.state.barrierModalOpen) {
                const row = this.getRandomInt(1, markers[this.state.selectedMarker].row) - 1;
                console.log(row)
                const randomBarrier = this.getRandomInt(0, this.state.barriersState[row].length - 1);
                console.log(randomBarrier)
                const states = [].concat(this.state.barriersState)
                const rowStates = [].concat(this.state.barriersState[row])
                if (this.state.barriersState[row][randomBarrier] !== -1) {
                    rowStates[randomBarrier] = this.getRandomInt(0, 1)
                    states[row] = rowStates
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
                    {
                        this.state.selectedMarker > -1 &&
                        this.state.barriersState.slice(0, markers[this.state.selectedMarker].row).map((row, rowIndex) => (
                            <div>
                                {markers[this.state.selectedMarker].row > 1 && <h3> Floor {4 - rowIndex}</h3>}
                                <Row style={{ display: '-webkit-box' }} key={rowIndex}>
                                    {
                                        row.map((barrier, index) =>
                                            <div key={index} style={{ width: '100px', textAlign: 'center', cursor: 'pointer' }}>
                                                <span style={{ fontSize: 20 }}>{index + 1}</span>
                                                <img
                                                    onClick={this.toggleBarrier(rowIndex, index)}
                                                    style={{ marginTop: '-20px' }}
                                                    src={
                                                        barrier === -1 ? BlockedFenceIcon :
                                                            barrier ? OpenFenceIcon : ClosedFenceIcon}
                                                    width={100} />
                                            </div>
                                        )
                                    }
                                </Row>
                            </div>
                        ))
                    }
                </Modal>

                <Modal
                    title={`Region details | ${this.state.selectedRegion > -1 ? regions[this.state.selectedRegion].name : ''}`}
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
                            <p><b>Percentage : </b> {Math.floor(regions[this.state.selectedRegion].current_population * 100 / regions[this.state.selectedRegion].max_population)} % </p>
                        </div>
                    }
                </Modal>

                <MyMapComponent
                    isMarkerShown
                    googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyDLHhE48HvQ6B3407JD41rZwFa_tnf5ppc"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `510px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                >
                    {
                        markers.map((position, index) => (
                            <Marker key={index}
                                onClick={this.openBarrierModal(index)} zIndex={101}
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