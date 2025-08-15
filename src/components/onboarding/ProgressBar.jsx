const ProgressBar = ({ currentStep, totalSteps }) => {
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full mb-8">
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium text-foreground">Progress</span>
        <span className="text-sm font-medium text-muted-foreground">
          {currentStep} of {totalSteps}
        </span>
      </div>
      <div className="w-full bg-muted rounded-full h-2">
        <div 
          className="bg-gradient-to-r from-purple-600 to-yellow-500 h-2 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;