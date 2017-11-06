// src/actions/loading.js
export const LOAD_ERROR = 'LOAD_ERROR'
export const LOAD_SUCCESS = 'LOAD_SUCCESS'
export const APP_LOADING = 'APP_LOADING'
export const APP_DONE_LOADING = 'APP_DONE_LOADING'
export const CLEAR_LOAD_ERROR = 'CLEAR_LOAD_ERROR'
export const AUTH_ERROR = 'AUTH_ERROR'

export const loading = (active = true) => ({
  type: active ? APP_LOADING : APP_DONE_LOADING
})

export const clearError = () => ({
  type: CLEAR_LOAD_ERROR
})

export const showError = (error) => ({
  type: LOAD_ERROR,
  payload: error
})
