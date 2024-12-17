import supabase from "./supabase";

export const login = async ({ email, password }) => {
  let { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const getCurrentUser = async () => {
  let { data: session } = await supabase.auth.getSession();

  if (!session) return null;

  const { data } = await supabase.auth.getUser();

  return data?.user;
};

export const getUserLogOut = async () => {
  let { error } = await supabase.auth.signOut();
  if (error) {
    throw new Error(error.message);
  }
};

export async function signup({ email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) throw new Error(error.message);
  return data;
}

export const updatePassword = async ({ email, password }) => {
  const { data, error } = await supabase.auth.updateUser({
    email,
    password,
  });

  if (error) throw new Error(error.message);
  return data;
};
