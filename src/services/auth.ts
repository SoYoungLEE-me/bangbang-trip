import { supabase } from "../lib/supabase";

//이메일 회원가입 로직
interface SignUpParams {
  name: string;
  email: string;
  password: string;
}

export const SignUpWithEmail = async ({
  name,
  email,
  password,
}: SignUpParams) => {
  //auth 유저 생성
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) throw error;
  if (!data.user) throw new Error("User not created");

  // profiles에 저장
  const { error: profileError } = await supabase.from("profiles").insert({
    id: data.user.id,
    name,
  });

  if (profileError) throw profileError;
  return data.user;
};

//이메일로 로그인
export const signInWithEmail = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;

  return data.user;
};

//구글 소셜 로그인
export const signInWithGoogle = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: window.location.origin,
    },
  });
  if (error) throw error;
};

//로그아웃
export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

//구글 로그인 profile에 동기화 시키는 함수
export const syncProfileNameFromGoogle = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  const googleName = user.user_metadata?.full_name || user.user_metadata?.name;

  if (!googleName) return;

  // profiles 조회
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("name")
    .eq("id", user.id)
    .single();

  // profiles row 자체가 없는 경우 → insert
  if (error) {
    await supabase.from("profiles").insert({
      id: user.id,
      name: googleName,
    });
    return;
  }

  // 이미 name 있으면 종료
  if (profile?.name) return;

  // name만 없는 경우 update
  await supabase
    .from("profiles")
    .update({ name: googleName })
    .eq("id", user.id);
};

//비밀 번호 재설정 함수
export const sendPasswordResetEmail = async (email: string) => {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  });
  if (error) throw error;
};
