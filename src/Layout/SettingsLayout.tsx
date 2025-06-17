


export const SettingsLayout = ({ children }: { children: React.ReactNode }) => {

  return (
    <>
      <div className="mx-auto max-w-7xl lg:flex lg:gap-x-16 lg:px-8">
        <main
          className={
            "px-4 py-16 sm:px-6 lg:flex-auto lg:px-0 lg:py-20 lg:mx-auto lg:max-w-2xl"
          }
        >
          <div className="mx-auto max-w-2xl space-y-16 sm:space-y-10 lg:mx-0 lg:max-w-none">
            {children}
          </div>
        </main>
      </div>
    </>
  );
};
