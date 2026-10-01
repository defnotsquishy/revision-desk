// Stage 1: Firebase accounts only. Never upload or re-label device ratings.
(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  let sdk, auth, loading, user = null, ready = false, busy = false, mode = 'login';
  let verifyAfter = 0;
  const status = message => { $('account-status').textContent = message; };
  const controls = () => {
    $('account-form').setAttribute('aria-busy', String(busy));
    $('account-submit').disabled = !ready || busy;
    ['login','signup','reset','verify','refresh','signout'].forEach(name => {
      $('account-' + name).disabled = !ready || busy;
    });
  };
  function renderUser() {
    window.dispatchEvent(new CustomEvent('revision-account-change', {detail: {uid:user?.uid || null}}));
    $('account-button').textContent = user ? 'Account' : 'Sign in';
    $('account-member').hidden = !user;
    $('account-form').hidden = !!user;
    $('account-email').textContent = user?.email || '';
    $('account-verification').textContent = user ? (user.emailVerified ? 'Email verified.' : 'Email not verified. Open the verification link in your inbox, then choose Check verification.') : '';
    $('account-verify').hidden = !!user?.emailVerified;
    $('account-refresh').hidden = !!user?.emailVerified;
    controls();
  }
  function errorMessage(error, operation) {
    if (['auth/network-request-failed','auth/timeout'].includes(error?.code)) return 'Could not connect. Check your internet connection and try again.';
    if (error?.code === 'auth/too-many-requests') return 'Too many attempts. Wait a little before trying again.';
    if (['auth/weak-password','auth/password-does-not-meet-requirements'].includes(error?.code)) return 'Choose a stronger unique password that meets the requirements.';
    if (['auth/operation-not-allowed','auth/unauthorized-domain','auth/invalid-api-key'].includes(error?.code)) return 'Account service configuration needs attention. Guest revision still works.';
    if (operation === 'signup') return 'Could not create this account. Try signing in or resetting your password if you already registered.';
    if (operation === 'login') return 'Could not sign in. Check your email and password, or reset your password.';
    return 'Could not complete this account action. Check your connection and try again.';
  }
  async function connect() {
    if (ready || loading) return loading;
    $('account-retry').hidden = true;
    status('Connecting to account service…');
    loading = (async () => {
      try {
        const [appSdk, authSdk, config] = await Promise.all([
          import('https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js'),
          import('https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js'),
          import('./firebase-config.js')
        ]);
        sdk = authSdk;
        auth = sdk.getAuth(appSdk.initializeApp(config.firebaseConfig));
        auth.languageCode = 'en';
        // Session survives reload, not a closed browser session on a shared PC.
        await sdk.setPersistence(auth, sdk.browserSessionPersistence);
        sdk.onAuthStateChanged(auth, next => { user = next; renderUser(); });
        await auth.authStateReady();
        user = auth.currentUser;
        ready = true;
        renderUser();
        status(user ? 'Signed in. Progress is still saved on this device only.' : 'Sign in or create an account. Guest revision stays available.');
      } catch (_) {
        status('Account service could not load. Check your connection and retry. You can keep revising as a guest.');
        $('account-retry').hidden = false;
        controls();
      } finally { loading = null; }
    })();
    return loading;
  }
  function clearErrors() {
    for (const name of ['email','password']) {
      const input = $(name === 'email' ? 'account-email-input' : 'account-password');
      input.removeAttribute('aria-invalid');
      $('account-' + name + '-error').textContent = '';
    }
  }
  function invalid(name, message) {
    const input = $(name === 'email' ? 'account-email-input' : 'account-password');
    $('account-' + name + '-error').textContent = message;
    input.setAttribute('aria-invalid', 'true');
    input.focus();
  }
  function setMode(next) {
    if (busy) return;
    mode = next;
    clearErrors();
    $('account-password').value = '';
    $('account-password').type = 'password';
    $('account-password-toggle').textContent = 'Show password';
    $('account-password-toggle').setAttribute('aria-pressed', 'false');
    $('account-password').autocomplete = mode === 'signup' ? 'new-password' : 'current-password';
    $('account-password-group').hidden = mode === 'reset';
    $('account-submit').textContent = {login:'Sign in',signup:'Create account',reset:'Send reset email'}[mode];
    ['login','signup','reset'].forEach(name => $('account-' + name).setAttribute('aria-pressed', String(mode === name)));
    status(mode === 'reset' ? 'Enter your email to request a password-reset link.' : 'Enter your email and password.');
  }
  async function perform(action, operation = 'account') {
    if (!ready || busy) return;
    busy = true;
    controls();
    status('Working…');
    try { await action(); }
    catch (error) { status(errorMessage(error, operation)); }
    finally { busy = false; $('account-password').value = ''; renderUser(); }
  }
  $('account-button').addEventListener('click', () => { $('account-dialog').showModal(); connect(); });
  $('account-close').addEventListener('click', () => $('account-dialog').close());
  $('account-dialog').addEventListener('close', () => { $('account-password').value = ''; $('account-password').type = 'password'; $('account-password-toggle').textContent = 'Show password'; $('account-password-toggle').setAttribute('aria-pressed','false'); });
  $('account-retry').addEventListener('click', connect);
  ['login','signup','reset'].forEach(name => $('account-' + name).addEventListener('click', () => setMode(name)));
  $('account-password-toggle').addEventListener('click', () => {
    const show = $('account-password').type === 'password';
    $('account-password').type = show ? 'text' : 'password';
    $('account-password-toggle').textContent = show ? 'Hide password' : 'Show password';
    $('account-password-toggle').setAttribute('aria-pressed', String(show));
  });
  $('account-form').addEventListener('submit', event => {
    event.preventDefault();
    if (!ready || busy) return;
    clearErrors();
    const email = $('account-email-input').value.trim();
    const password = $('account-password').value;
    if (!email || $('account-email-input').validity.typeMismatch) return invalid('email','Enter a valid email address, such as name@example.com.');
    if (mode !== 'reset' && !password) return invalid('password','Enter your password.');
    if (mode === 'signup' && password.length < 8) return invalid('password','Use at least 8 characters. A longer unique password is better.');
    perform(async () => {
      if (mode === 'reset') {
        try { await sdk.sendPasswordResetEmail(auth, email); }
        catch (error) { if (!['auth/user-not-found','auth/invalid-email'].includes(error.code)) throw error; }
        status('If an account exists for this email, a reset link has been sent. Check your inbox and spam folder.');
      } else if (mode === 'signup') {
        const result = await sdk.createUserWithEmailAndPassword(auth, email, password);
        user = result.user;
        // Account exists even if email delivery fails; never retry registration for that error.
        try { await sdk.sendEmailVerification(user); verifyAfter = Date.now() + 60000; status('Account created. Check your inbox and spam folder for your verification link.'); }
        catch (_) { status('Account created, but verification email could not be sent. Use Send verification email to retry.'); }
      } else {
        const result = await sdk.signInWithEmailAndPassword(auth, email, password);
        user = result.user;
        status('Signed in. Progress is still saved on this device only.');
      }
    }, mode);
  });
  $('account-signout').addEventListener('click', () => perform(async () => { await sdk.signOut(auth); user = null; status('Signed out. Your device-only revision ratings are unchanged.'); }));
  $('account-refresh').addEventListener('click', () => perform(async () => { if (!user) return; await sdk.reload(user); user = auth.currentUser; status(user?.emailVerified ? 'Your email is verified.' : 'Not verified yet. Open the link in your inbox, then check again.'); }));
  $('account-verify').addEventListener('click', () => {
    if (Date.now() < verifyAfter) return status('Wait one minute between verification-email requests.');
    perform(async () => { if (!user || user.emailVerified) return; await sdk.sendEmailVerification(user); verifyAfter = Date.now() + 60000; status('Verification email sent. Check your inbox and spam folder.'); });
  });
  connect();
})();
