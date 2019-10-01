class googleMapsContextMenu {
    constructor(map, layout, markers, themeColor, appendDefault) {
        this._map = map;
        this._appendDefault = appendDefault ? appendDefault : true;
        this._themeColor = themeColor ? themeColor : `rgba(16, 150, 145)`;
        this.markers = markers ? markers : [];
        this.layout = layout ? layout : this.getDefaultLayout();
        this.currentInstance = [];
        this.divisionContainer = [];
        this.eventCoordinate = {lat: null, lng: null};
        this.clickedMarker = {};
        this.event = {};
    }

    get appendDefault() {
        return this._appendDefault;
    }

    get map() {
        return this._map;
    }

    get themeColor() {
        return this._themeColor;
    }

    init() {
        this.initEvents();
    }

    build(event) {
        let container = document.createElement('div');
        container.setAttribute(`id`, `googleMapsContextMenu-container`);
        container.style.position = `absolute`;
        container.style.backgroundColor = `white`;
        container.style.padding = `5px`;
        container.style.borderRadius = `10px`;

        container.style.width = `200px`;
        container.style.height = `${(this.layout.length * 35) + 10}px`;

        container.style.left = `${event.xa.x}px`;
        container.style.top = `${event.xa.y}px`;

        this.currentInstance = container;

        this.event = event;
        this.eventCoordinate.lat = event.latLng.lat();
        this.eventCoordinate.lng = event.latLng.lng();

        this.buildDivision();
        document.body.appendChild(this.currentInstance);

        this.defaultUiEvents();
    }

    buildDivision() {
        if(this.divisionContainer.parentNode) {
            this.divisionContainer.remove();
        }

        this.divisionContainer = document.createElement(`div`);

        this.layout.forEach((division) => {
            let divisionInstance = document.createElement('div');
            divisionInstance.setAttribute(`id`, division.id);
            divisionInstance.setAttribute(`class`, `googleMapsContextMenu-division`);
            divisionInstance.style.width = `100%`;
            divisionInstance.style.height = `35px`;
            divisionInstance.style.padding = `5px`;
            divisionInstance.style.borderRadius = `10px`;
            divisionInstance.style.cursor = `pointer`;

            if(division.icon) {
                let img = document.createElement(`img`);
                img.setAttribute(`alt`, `Context Menu Icon`);
                img.setAttribute(`src`, division.icon);
                img.style.height = `25px`;
                img.style.width = `25px`;
                divisionInstance.appendChild(img);
            }

            let spanTitle = document.createElement(`span`);
            spanTitle.innerText = division.label;
            divisionInstance.appendChild(spanTitle);

            this.addEvent(divisionInstance, division.event);

            this.divisionContainer.appendChild(divisionInstance);
        });

        this.currentInstance.appendChild(this.divisionContainer);
    }

    add(menuObject) {
        menuObject.temp = true;
        this.layout.push(menuObject);
        this.currentInstance.style.height = `${(this.layout.length * 35) + 10}px`;
        this.buildDivision();

        this.defaultUiEvents();
    }

    remove(id) {
        this.layout.forEach((elem, index) => {
            if(elem.id === id) {
                delete this.layout[index];
            }
        });

        this.layout = this.layout.filter(() => {return true;});

        this.currentInstance.style.height = `${(this.layout.length * 35) + 10}px`;

        document.getElementById(id).remove();

        this.defaultUiEvents();
    }

    removeAdded() {
        this.layout.forEach((elem, index) => {
            if(elem.temp) {
                delete this.layout[index];
            }
        });

        this.layout = this.layout.filter(() => {return true;});

        this.defaultUiEvents();
    }

    initEvents() {
        this.map.addListener('rightclick', (event) => {
            this.removeAdded();
            this.destroy();
            this.build(event);
        });

        this.map.addListener(`click`, () => {
            this.destroy();
        });

        this.map.addListener('dragstart', () => {
            this.destroy();
        });

        this.map.addListener('bounds_changed', () => {
            this.destroy();
        });

        this.markerEvents();
    }

    markerEvents() {
        if(this.markers.length) {
            let that = this;

            this.markers.forEach((marker) => {
                marker.addListener('rightclick', (event) => {
                    that.clickedMarker = marker;
                    this.destroy();
                    this.build(event);
                });
            });
        }
    }

    updateMarkers(markers, markerOptionsLayout) {
        if(markerOptionsLayout) {
            this.removeAdded();

            markerOptionsLayout.forEach((obj) => {
                this.add(obj)
            });
        }

        this.markers = markers;
        this.markerEvents();
    }

    getDefaultLayout() {
        if(this.appendDefault) {
            return [
                {label: 'Zoom In', icon: '', id: 'googleMapsContextMenu-zoomIn',
                    event: {
                        'click': () => {
                            this.map.setZoom(parseInt(this.map.getZoom()) + 1);
                        }
                    }
                },
                {
                    label: 'Zoom Out', icon: '', id: 'googleMapsContextMenu-zoomOut',
                    event: {
                        'click': () => {
                            this.map.setZoom(parseInt(this.map.getZoom()) - 1);
                        }
                    }
                }
            ];
        }
    }

    defaultUiEvents() {
        let selector = document.querySelectorAll(`.googleMapsContextMenu-division`);

        Array.from(selector).forEach((element) => {
            element.addEventListener('mouseover', () => {
                element.style.backgroundColor = this.themeColor;
                element.style.color = `white`;
            });

            element.addEventListener('mouseout', () => {
                element.style.backgroundColor = `white`;
                element.style.color = `#6b6f82`;
            });
        });
    }

    destroy() {
        if(this.currentInstance.parentNode) {
            this.currentInstance.remove();
        }
    }

    addEvent(element, event) {
        if (event) {
            let keyObj = Object.keys(event);
            for (let i = 0; i < keyObj.length; i++) {
                element.addEventListener(keyObj[i], event[keyObj[i]]);
            }
        }
    }
}