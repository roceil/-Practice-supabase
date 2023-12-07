import supabase from '@/supabase'

const getUser = async (userId) => {
  const { data, error } = await supabase.from('users').select().eq('id', userId)

  if (error) {
    alert(error.message)
    return
  }

  return data
}

export default getUser
