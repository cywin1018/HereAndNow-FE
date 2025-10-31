const SplashScreen = () => {
  return (
    <div className="fixed top-0 left-0 z-[9999] flex h-screen w-screen items-center justify-center bg-white">
      <img src="/splashLogo.svg" alt="Loading..." className="w-20" />
    </div>
  );
};

export default SplashScreen;
