export const handlerError = (e: any) => {
  if (e.response?.data?.message?.message) throw new Error(e.response?.data?.message?.message)
  else if (e.response?.data?.error?.message) throw new Error(e.response?.data?.error?.message)
  else throw e
}