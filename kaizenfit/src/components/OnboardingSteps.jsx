import React, { useState } from 'react';
import ProgressBar from './ProgressBar';
import BasicInfoForm from './BasicInfoForm';
import FitnessGoalsForm from './FitnessGoalsForm';
import DietPreferencesForm from './DietPreferencesForm';
import MedicalHistoryForm from './MedicalHistoryForm';
import NavigationButtons from './NavigationButtons';

const OnboardingSteps = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({/*...*/});

    const steps = [
        { title: 'Basic Info', component: <BasicInfoForm /> },
        { title: 'Fitness Goals', component: <FitnessGoalsForm /> },
        { title: 'Diet Preferences', component: <DietPreferencesForm /> },
        { title: 'Medical History', component: <MedicalHistoryForm /> }
    ];

    return (
        <div>
            <ProgressBar currentStep={step} totalSteps={steps.length} />
            {steps[step-1].component}
            <NavigationButtons 
                onNext={() => setStep(s => s + 1)}
                onPrev={() => setStep(s => s - 1)}
                isFirstStep={step === 1}
                isLastStep={step === steps.length}
            />
        </div>
    );
};

export default OnboardingSteps; 