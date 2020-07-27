import Vue from 'vue'
import Vuex from 'vuex'
import { vuexfireMutations, firestoreAction } from 'vuexfire'
import moment from 'moment'
import VueInstance from '@/main'
const fb = require('@/fb.js')
//plugin that saves state on page refresh
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export const store = new Vuex.Store({
  plugins: [
    //plugin that saves state on page refresh
    createPersistedState({
      storage: window.sessionStorage
    })
  ],
  state: {
    LOADED: false,
    stations: [],
    users: [],
    userId: null,
    currentUser: null,
    farmId: null,
    farms: [],
    farmOwners: [],
    fields: [],
    crops: [],
    allCycles: [],
    cropCycle: [],
    pests: [],
    pesticides: [],
    ferts: [],
    pImplement: [],
    weather: null,
    openWeather: null,
    selectedCrop: {},
    selectedField: {},
    currentCycle: {},
    startDate: null,
    cropLog: [],

    //for coop
    coop: [],
    Chickens: [],
    allchickCycle: [],
    chickCycle: [],
    selectedchickCycle: {},
    selectedCoop: {},
    currentchickCycle: {}
  },
  mutations: {
    ...vuexfireMutations,

    updateUid: (state, uid) => {
      state.userId = uid
    },

    updateFid: (state, fid) => {
      state.farmId = fid
      state.LOADED = true
    },

    updateSelectedCrop(state, crop) {
      state.selectedCrop = crop
    },
    updateSelectedField(state, Field) {
      state.selectedField = Field
    },

    addCropCycle(state, NewCrop) {
      let ref = fb.cropCycle.doc()
      ref.set({
        id: ref.id,
        cropId: state.selectedCrop.id,
        cropName: state.selectedCrop.name,
        duration: state.selectedCrop.duration,
        farmId: state.farmId,
        fieldId: NewCrop.id,
        fieldName: state.selectedField.name,
        fieldArea: state.selectedField.area,
        startDate: moment(state.startDate).format('L')
      })
    },

    addNewField(state, field) {
      fb.field.doc(field.id).set(field)
    },
    setStartDate(state, startDate) {
      state.startDate = startDate
    },
    setCurrentCycle(state, cycle) {
      state.currentCycle = cycle
    },
    getWeather(state, response) {
      state.openWeather = response
    },

    //for coop
    addNewChickens(state, newChickens) {
      let ref = fb.Chickens.doc()
      ref.set({
        id: ref.id,
        AverageEggs: newChickens.AverageEggs,
        DayAverageFood: newChickens.DayAverageFood,
        name: newChickens.name
      })
    },
    setcurrentchickCycle(state, cycle) {
      state.currentchickCycle = cycle
    },
    setchickCycle(state, cycle) {
      state.chickCycle = cycle
    },

    updateselectedchickCycle(state, Chickens) {
      state.selectedchickCycle = Chickens
    },
    updateselectedcoop(state, coop) {
      state.selectedCoop = coop
    },

    addchickCycle(state, chick) {
      let ref = fb.chickCycle.doc()
      ref.set({
        id: ref.id,
        chickId: state.selectedchickCycle.id,
        namechickCycle: state.selectedchickCycle.name,
        farmId: state.farmId,
        CoopName: state.selectedCoop.CoopName,
        coopId: state.selectedCoop.id,
        quantity: parseInt(chick.quantity),
        currentChickens: parseInt(chick.quantity),
        currentFood: 0,
        startDate: moment(state.startDate).format('L')
      })
    },

    addCoop(state, Coop) {
      fb.coop.doc(Coop.id).set({
        farmId: state.farmId,
        CoopName: Coop.CoopName,
        maxCapacity: Coop.maxCapacity
      })
    }
  },
  actions: {
    //data binding using vuexfire
    bindStations: firestoreAction(({ bindFirestoreRef }) => {
      // return the promise returned by `bindFirestoreRef`
      return bindFirestoreRef('stations', fb.station)
    }),
    bindUsers: firestoreAction(({ bindFirestoreRef }) => {
      // return the promise returned by `bindFirestoreRef`
      return bindFirestoreRef('users', fb.user)
    }),
    bindCurrentUser: firestoreAction(({ state, bindFirestoreRef }) => {
      // return the promise returned by `bindFirestoreRef`
      return bindFirestoreRef(
        'currentUser',
        fb.user.where('userId', '==', state.userId)
      )
    }),
    bindFarmOwners: firestoreAction(({ bindFirestoreRef }) => {
      // return the promise returned by `bindFirestoreRef`
      return bindFirestoreRef('farmOwners', fb.farmOwner)
    }),
    bindFarms: firestoreAction(({ bindFirestoreRef }) => {
      // return the promise returned by `bindFirestoreRef`
      return bindFirestoreRef('farms', fb.farm)
    }),
    bindAllCycles: firestoreAction(({ bindFirestoreRef }) => {
      // return the promise returned by `bindFirestoreRef`
      return bindFirestoreRef('allCycles', fb.cropCycle)
    }),
    bindCropCycle: firestoreAction(({ state, bindFirestoreRef }) => {
      // return the promise returned by `bindFirestoreRef`
      return bindFirestoreRef(
        'cropCycle',
        fb.cropCycle.where('farmId', '==', state.farmId)
      )
    }),
    bindFields: firestoreAction(({ state, bindFirestoreRef }) => {
      // return the promise returned by `bindFirestoreRef`
      return bindFirestoreRef(
        'fields',
        fb.field.where('farmId', '==', state.farmId)
      )
    }),
    bindCrops: firestoreAction(({ bindFirestoreRef }) => {
      // return the promise returned by `bindFirestoreRef`
      return bindFirestoreRef('crops', fb.crop)
    }),
    bindPests: firestoreAction(({ bindFirestoreRef }) => {
      // return the promise returned by `bindFirestoreRef`
      return bindFirestoreRef('pests', fb.pest)
    }),
    bindPesticides: firestoreAction(({ bindFirestoreRef }) => {
      // return the promise returned by `bindFirestoreRef`
      return bindFirestoreRef('pesticides', fb.pesticide)
    }),
    bindPimplement: firestoreAction(({ bindFirestoreRef }) => {
      // return the promise returned by `bindFirestoreRef`
      return bindFirestoreRef('pImplement', fb.pImplement)
    }),
    bindFerts: firestoreAction(({ bindFirestoreRef }) => {
      // return the promise returned by `bindFirestoreRef`
      return bindFirestoreRef('ferts', fb.fertilizer)
    }),
    bindCropLog: firestoreAction(({ state, bindFirestoreRef }) => {
      // return the promise returned by `bindFirestoreRef`
      return bindFirestoreRef(
        'cropLog',
        fb.cropLog.where('cycleId', '==', state.currentCycle.id)
      )
    }),

    bindWeather: firestoreAction(({ bindFirestoreRef }) => {
      // return the promise returned by `bindFirestoreRef`
      return bindFirestoreRef('weather', fb.weather)
    }),
    //actions that change state data

    async updateUid({ commit }) {
      let uid = null
      await fb.auth.onAuthStateChanged(user => {
        if (user) {
          uid = user.uid
        }
      })
      commit('updateUid', uid)
    },

    updateFid({ commit, state }) {
      let fid = state.farms.find(obj => obj.userId == state.userId).id
      commit('updateFid', fid)
    },

    //`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=cf89017588e993af02c5a5e11390cef3&units=metric&lang=he`

    getWeather(commit, position) {
      let lat = position.coords.latitude
      let lon = position.coords.longitude
      VueInstance.$http
        .get(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&appid=cf89017588e993af02c5a5e11390cef3&units=metric&lang=he`
        )
        .then(
          response => {
            this.commit('getWeather', response.body)
          },
          error => {
            console.log(error)
          }
        )
    },
    //for coop

    bindallchickCycle: firestoreAction(({ bindFirestoreRef }) => {
      // return the promise returned by `bindFirestoreRef`
      return bindFirestoreRef('allchickCycle', fb.chickCycle)
    }),
    bindchickCycle: firestoreAction(({ state, bindFirestoreRef }) => {
      // return the promise returned by `bindFirestoreRef`
      return bindFirestoreRef(
        'chickCycle',
        fb.chickCycle.where('farmId', '==', state.farmId)
      )
    }),
    bindcoop: firestoreAction(({ state, bindFirestoreRef }) => {
      // return the promise returned by `bindFirestoreRef`
      return bindFirestoreRef(
        'coop',
        fb.coop.where('farmId', '==', state.farmId)
      )
    }),
    bindChickens: firestoreAction(({ bindFirestoreRef }) => {
      // return the promise returned by `bindFirestoreRef`
      return bindFirestoreRef('Chickens', fb.Chickens)
    }),
    bindCycleData: firestoreAction(({ state, bindFirestoreRef }) => {
      // return the promise returned by `bindFirestoreRef`
      return bindFirestoreRef(
        'cycleData',
        fb.cycleData.where('cycleId', '==', state.currentchickCycle.id)
      )
    })
  },

  getters: {
    //tells if data finished loading from firestore.
    LOADED: state => {
      return state.LOADED
    },

    stations: state => {
      return state.stations
    },
    userId: state => {
      return state.userId
    },
    farmId: state => {
      return state.farmId
    },
    users: state => {
      return state.users
    },
    currentUser: state => {
      return state.currentUser
    },
    farms: state => {
      return state.farms
    },
    farmOwners: state => {
      return state.farmOwners
    },
    cropCycle: state => {
      return state.cropCycle
    },
    fields: state => {
      return state.fields
    },
    crops: state => {
      return state.crops
    },
    pests: state => {
      return state.pests
    },
    pesticides: state => {
      return state.pesticides
    },
    pImplement: state => {
      return state.pImplement
    },
    ferts: state => {
      return state.ferts
    },
    selectedCrop: state => {
      return state.selectedCrop
    },
    selectedField: state => {
      return state.selectedField
    },
    currentCycle: state => {
      return state.currentCycle
    },
    cropLog: state => {
      return state.cropLog
    },

    weather: state => {
      return state.weather
    },
    openWeather: state => {
      return state.openWeather
    },

    //for coop

    coop: state => {
      return state.coop
    },
    Chickens: state => {
      return state.Chickens
    },
    chickCycle: state => {
      return state.chickCycle
    },
    allchickCycle: state => {
      return state.allchickCycle
    },
    selectedchickCycle: state => {
      return state.selectedchickCycle
    },
    currentchickCycle: state => {
      return state.currentchickCycle
    },
    selectedCoop: state => {
      return state.selectedCoop
    },
    cycleData: state => {
      return state.cycleData
    }
  }
})
