import path from 'path';

export const aliases = {
    ERC20Generator: path.resolve(__dirname, 'src/components/erc20Generator/ERC20Generator.tsx'),
    Header: path.resolve(__dirname, 'src/components/layout/Header.tsx'),
    Footer: path.resolve(__dirname, 'src/components/layout/Footer.tsx'),
    erc20GeneratorTypes: path.resolve(__dirname, 'src/components/erc20Generator/erc20Generator.types.ts'),
    ToggleCard: path.resolve(__dirname, 'src/components/erc20Generator/ToggleCard.tsx'),
    ConfiguredBasicPropertiesStep: path.resolve(__dirname, 'src/components/erc20Generator/Configs/ConfiguredBasicPropertiesStep.tsx'),
    ConfiguredProtectionStep: path.resolve(__dirname, 'src/components/erc20Generator/Configs/ConfiguredProtectionStep.tsx'),
    ConfiguredRatesStep: path.resolve(__dirname, 'src/components/erc20Generator/Configs/ConfiguredRatesStep.tsx'),
    ConfiguredSummaryStep: path.resolve(__dirname, 'src/components/erc20Generator/Configs/ConfiguredSummaryStep.tsx'),
    StepNavigation: path.resolve(__dirname, 'src/components/erc20Generator/nav/StepNavigation.tsx'),
    AnimatedStepContent: path.resolve(__dirname, 'src/components/erc20Generator/animation/AnimatedStepContent.tsx'),
    animationVariants: path.resolve(__dirname, 'src/components/erc20Generator/animation/animationVariants.tsx'),
    navSteps: path.resolve(__dirname, 'src/components/erc20Generator/constants/erc20Generator.constants.ts'),
    useERC20Form: path.resolve(__dirname, 'src/components/erc20Generator/hooks/useERC20Form.ts'),
    useDexManagement: path.resolve(__dirname, 'src/components/erc20Generator/hooks/useDexManagement.ts'),
};
