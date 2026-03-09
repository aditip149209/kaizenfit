import { DataTypes } from 'sequelize'
import {db} from '../config/db.js'
import Sequelize from 'sequelize';

const User = db.define('User', {
    userid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    }, 
    isOnboarded: {
        type: DataTypes.BOOLEAN,
        default: false
    }
})

const UserProfile = db.define('UserProfile', {
    userid: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: User,
            key: 'userid',
        }
    },
    gender: {
        type: DataTypes.ENUM('male', 'female', 'non-binary', 'prefer_not_to_say'),
    },
    height: {
        type: DataTypes.FLOAT
    },
    heightType : {
        type: DataTypes.ENUM('cm', 'inch')
    },
    weight: {
        type: DataTypes.FLOAT,
    },
    weightType: {
        type: DataTypes.ENUM('kg', 'lb')
    },
    goal: {
        type: DataTypes.ENUM('lose_weight', 'gain_muscle', 'maintain_weight','improve_fitness'),
    },
    activityLevel : {
        type: DataTypes.ENUM('sedentary', 'light','moderate','active','very_active')
        //sedentary- couch potato, no exercise, hasnt exerted themselves i.e. climbed stairs or ran in months
        //light: might be climbing stairs, walk during the day, but no gym or workouts, visited a gym weeks ago or works out once a week
        //moderate: goes to the gym max thrice a week
        //active: goes to the gym almost everyday
        //very-active: full time job is being an athlete- visits the gym more than 7 times in a week
    }, 
    injuries: {
        type: DataTypes.TEXT
    }, 
});


    const Exercise = db.define('Exercise', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        targetMuscleGroup: {
            type: DataTypes.ENUM('Chest', 'Abdomen', 'Lower Back', 'Upper Back', 'Triceps', 'Biceps', 'Quads', 'Glutes', 'Calf', 'Hamstrings', 'FullBody', 'Obliques', 'Shoulders'), 
            default: 'FullBody'
        },
        description: {
            type: DataTypes.TEXT,
        },
        videoUrl: {
            type: DataTypes.STRING,
        },
        exerciseType: {
            type: DataTypes.ENUM('Strength', 'Cardio', 'Flexibility','Conditioning'),
            default: 'Strength'
        }
    });

    const WorkoutPlan = db.define('WorkoutPlans', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
        },
        // e.g., 'Beginner', 'Intermediate', 'Advanced'
        difficulty: {
            type: DataTypes.ENUM('Beginner', 'Intermediate','Advanced'),
        },
    });

    const UserWorkoutPlan = db.define('UserWorkoutPlan', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
        },
        // Foreign key for the User
        userid: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
            model: User,
            key: 'userid',
            },
        },
    });

    const WorkoutLog = db.define('WorkoutLog', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
    },
    notes: {
        type: DataTypes.TEXT,
    },
    // Foreign key for the User
    userid: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
        model: User,
        key: 'userid',
        },
    },
    // Can be linked to a plan or a custom workout (optional)
    workoutPlanId: {
        type: DataTypes.UUID,
        references: { model: WorkoutPlan, key: 'id' },
    },
    userWorkoutId: {
        type: DataTypes.UUID,
        references: { model: UserWorkoutPlan, key: 'id' },
    },
});

    const ExerciseLog = db.define('ExerciseLog', {
    id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    },
    sets: {
        type: DataTypes.INTEGER,
    },
    reps: {
        type: DataTypes.INTEGER,
    },
    weight: {
        type: DataTypes.FLOAT,
    },
    duration: {
        type: DataTypes.INTEGER, // For time-based exercises (in seconds)
    },
    // Foreign key for the WorkoutLog
    workoutLogId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
        model: WorkoutLog,
        key: 'id',
        },
    },
    // Foreign key for the Exercise
    exerciseId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
        model: Exercise,
        key: 'id',
        },
    },
});

    const FoodItem = db.define('FoodItems', {
        id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    calories: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    protein: {
        type: DataTypes.FLOAT, // in grams
    },
    carbs: {
        type: DataTypes.FLOAT, // in grams
    },
    fat: {
        type: DataTypes.FLOAT, // in grams
    },
    servingUnit: {
        type: DataTypes.ENUM('grams','katori','bowl','glass','spoon','piece','pieces'), // e.g., '100g', '1 cup', '1 item'
    },
    servingSize: {
        type: DataTypes.INTEGER,
    },
    // Can be null if it's a pre-defined item
    userid: {
        type: DataTypes.UUID,
        references: {
        model: User,
        key: 'userid',
        },
    },
});

    const DietPlan = db.define('DietPlan', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false, // 'Keto', 'Paleo', 'Vegan'
    },
    DietType:{
        type: DataTypes.ENUM('Keto','Paleo','Vegan','Vegetarian','Non-Vegetarian','Eggetarian','Pescatarian'),
    },
    description: {
        type: DataTypes.TEXT,
    },
});

    const UserDietPlan = db.define('UserDietPlan', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // Foreign key for the User
        userid: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: User,
                key: 'userid',
            },
        },
        
    });

    const MealLog = db.define('MealLog', {
        id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    date: {
        type: DataTypes.DATEONLY, // Just the date, no time
        allowNull: false,
    },
    mealType: {
        type: DataTypes.ENUM('breakfast', 'lunch', 'dinner', 'snack'),
        allowNull: false,
    },
    quantity: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 1.0,
    },
    // Foreign key for the User
    userid: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
        model: User,
        key: 'userid',
        },
    },
    // Foreign key for the FoodItem
    foodItemId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
        model: FoodItem,
        key: 'id',
        },
    },        
    });

    const WaterLog = db.define('WaterLog', {
        id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    amount: {
        type: DataTypes.FLOAT, // Store in a consistent unit (e.g., mL)
        allowNull: false,
    },
    // Foreign key for the User
    userid: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
        model: User,
        key: 'userid',
        },
    },

    });

    const UserGoal = db.define('UserGoal', {
        id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
    calorieGoal: {
        type: DataTypes.INTEGER,
    },
    waterGoal: {
        type: DataTypes.INTEGER, // in mL
    },
    // Can be set to a specific date, or null for 'current'
    date: {
        type: DataTypes.DATEONLY,
        defaultValue: Sequelize.NOW,
    },
    // Foreign key for the User
    userid: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
        model: User,
        key: 'userid',
        },
    },

    });

    const TransformationJournal = db.define('TransformationJournal', {
        id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
        date: {
            type: DataTypes.DATE,
            defaultValue: Sequelize.NOW,
        },
        title: {
            type: DataTypes.STRING,
        },
        content: {
            type: DataTypes.TEXT, // Stored as Markdown text
            allowNull: false,
        },
        // Foreign key for the User
        userid: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
            model: User,
            key: 'userid',
            },
        },
    });


    const HealthData = db.define('HealthData', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        heartRate: {
            type: DataTypes.INTEGER, // Average or resting
        },
        sleepHours: {
            type: DataTypes.FLOAT,
        },
        bloodPressureSystolic: {
            type: DataTypes.INTEGER,
        },
        bloodPressureDiastolic: {
            type: DataTypes.INTEGER,
        },
        // Foreign key for the User
        userid: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
            model: User,
            key: 'userid',
            },
        },
        });


    const WorkoutPlanExercise = db.define('WorkoutPlanExercise', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        sets: DataTypes.INTEGER,
        reps: DataTypes.STRING, // Can be a range like '8-12'
        rest: DataTypes.INTEGER, // in seconds
        workoutPlanId: {
            type: DataTypes.UUID,
            references: { model: WorkoutPlan, key: 'id' },
        },
        exerciseId: {
            type: DataTypes.UUID,
            references: { model: Exercise, key: 'id' },
        },


    });

    const UserWorkoutExercise = db.define('UserWorkoutExercise', {
        id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
        sets: DataTypes.INTEGER,
        reps: DataTypes.STRING, // '8-12'
        userWorkoutId: {
            type: DataTypes.UUID,
            references: { model: UserWorkoutPlan, key: 'id' },
        },
        exerciseId: {
            type: DataTypes.UUID,
            references: { model: Exercise, key: 'id' },
        },
    });

    const DietPlanFoodItem = db.define('DietPlanFoodItem', {
        id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    // e.g., 'Breakfast', 'Lunch', 'Dinner'
        mealSuggestion: DataTypes.STRING, 
        dietPlanId: {
            type: DataTypes.UUID,
            references: { model: DietPlan, key: 'id' },
        },
        foodItemId: {
            type: DataTypes.UUID,
            references: { model: FoodItem, key: 'id' },
        },

    });

    const UserDietPlanFoodItem = db.define('UserDietPlanFoodItem', {
        id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
        userDietPlanId: {
            type: DataTypes.UUID,
            references: { model: UserDietPlan, key: 'id' },
        },
        foodItemId: {
            type: DataTypes.UUID,
            references: { model: FoodItem, key: 'id' },
        },
    });

    
    

    const Tiers = db.define('Tiers', {
        id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
        name: {
            type: DataTypes.STRING,
            allowNull: false, // e.g., 'Free', 'Pro', 'Premium'
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false, // 0 for 'Free'
        },
        // e.g., 'monthly', 'yearly'
        billingCycle: {
            type: DataTypes.ENUM('monthly', 'yearly', 'one-time'),
            defaultValue: 'monthly',
        },
        features: {
            type: DataTypes.JSON, // Store features as a JSON array of strings
            // e.g., ['Unlimited Workouts', 'Diet Plan Generator', 'Watch Sync']
        },
    });

    const Subscriptions = db.define('Subscription', {
        id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
        userid: {
            type: DataTypes.UUID,
            allowNull: false,
            references: { model: User, key: 'userid' },
        },
        tierId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: { model: Tiers, key: 'id' },
        },
        status: {
            type: DataTypes.ENUM('active', 'canceled', 'past_due', 'trial'),
            allowNull: false,
            defaultValue: 'active',
        },
        startDate: {
            type: DataTypes.DATE,
            defaultValue: Sequelize.NOW,
        },
        nextBillingDate: {
            type: DataTypes.DATE,
        },
        // Store the ID from your payment provider (e.g., Stripe)
        paymentProviderId: {
            type: DataTypes.STRING,
            unique: true,
        }
    });

    const Payments = db.define('Payments', {
        id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
        subscriptionId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: { model: Subscriptions, key: 'id' },
        },
        amount: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        date: {
            type: DataTypes.DATE,
            defaultValue: Sequelize.NOW,
        },
        status: {
            type: DataTypes.ENUM('succeeded', 'failed', 'pending'),
            allowNull: false,
        },
        // Store the payment intent or charge ID from your payment provider
        chargeId: {
            type: DataTypes.STRING,
        },
    });



    //relationships and associations

    User.hasOne(UserProfile, { foreignKey: 'userid', onDelete: 'CASCADE' });
    User.hasMany(UserWorkoutPlan, { foreignKey: 'userid', onDelete: 'CASCADE' });
    User.hasMany(WorkoutLog, { foreignKey: 'userid', onDelete: 'CASCADE' });
    User.hasMany(MealLog, { foreignKey: 'userid', onDelete: 'CASCADE' });
    User.hasMany(WaterLog, { foreignKey: 'userid', onDelete: 'CASCADE' });
    User.hasMany(UserGoal, { foreignKey: 'userid', onDelete: 'CASCADE' });
    User.hasMany(TransformationJournal, { foreignKey: 'userid', onDelete: 'CASCADE' });
    User.hasMany(HealthData, { foreignKey: 'userid', onDelete: 'CASCADE' });
    User.hasMany(FoodItem, { foreignKey: 'userid' }); // User-created foods
    User.hasMany(UserDietPlan, { foreignKey: 'userid', onDelete: 'CASCADE' });

    // UserProfile Relationships
    UserProfile.belongsTo(User, { foreignKey: 'userid' });

    // WorkoutPlan Relationships
    WorkoutPlan.belongsToMany(Exercise, { through: WorkoutPlanExercise, foreignKey: 'workoutPlanId' });

    // UserWorkout Relationships
    UserWorkoutPlan.belongsTo(User, { foreignKey: 'userid' });
    UserWorkoutPlan.belongsToMany(Exercise, { through: UserWorkoutExercise, foreignKey: 'userWorkoutId' });

    // WorkoutLog Relationships
    WorkoutLog.belongsTo(User, { foreignKey: 'userid' });
    WorkoutLog.belongsTo(WorkoutPlan, { foreignKey: 'workoutPlanId' });
    WorkoutLog.belongsTo(UserWorkoutPlan, { foreignKey: 'userWorkoutId' });
    WorkoutLog.hasMany(ExerciseLog, { foreignKey: 'workoutLogId', onDelete: 'CASCADE' });

    // ExerciseLog Relationships
    ExerciseLog.belongsTo(WorkoutLog, { foreignKey: 'workoutLogId' });
    ExerciseLog.belongsTo(Exercise, { foreignKey: 'exerciseId' });

    // Exercise Relationships
    Exercise.belongsToMany(WorkoutPlan, { through: WorkoutPlanExercise, foreignKey: 'exerciseId' });
    Exercise.belongsToMany(UserWorkoutPlan, { through: UserWorkoutExercise, foreignKey: 'exerciseId' });
    Exercise.hasMany(ExerciseLog, { foreignKey: 'exerciseId' });

    // FoodItem Relationships
    FoodItem.belongsTo(User, { foreignKey: 'userid' }); // For user-created foods
    FoodItem.hasMany(MealLog, { foreignKey: 'foodItemId' });
    FoodItem.belongsToMany(DietPlan, { through: DietPlanFoodItem, foreignKey: 'foodItemId' });
    FoodItem.belongsToMany(UserDietPlan, { through: UserDietPlanFoodItem, foreignKey: 'foodItemId' });

    // DietPlan Relationships
    DietPlan.belongsToMany(FoodItem, { through: DietPlanFoodItem, foreignKey: 'dietPlanId'});

    // UserDietPlan Relationships
    UserDietPlan.belongsTo(User, { foreignKey: 'userid' });
    UserDietPlan.belongsToMany(FoodItem, { through: UserDietPlanFoodItem, foreignKey: 'userDietPlanId' });

    // MealLog Relationships
    MealLog.belongsTo(User, { foreignKey: 'userid' });
    MealLog.belongsTo(FoodItem, { foreignKey: 'foodItemId' });

    // WaterLog Relationships
    WaterLog.belongsTo(User, { foreignKey: 'userid' });

    // UserGoal Relationships
    UserGoal.belongsTo(User, { foreignKey: 'userid' });

    // TransformationJournal Relationships
    TransformationJournal.belongsTo(User, { foreignKey: 'userid' });

    // HealthData Relationships
    HealthData.belongsTo(User, { foreignKey: 'userid' });

    // --- Subscription, Tier, and Payment Relationships ---

// A Tier (e.g., "Pro") can have many Subscriptions
Tiers.hasMany(Subscriptions, { foreignKey: 'tierId' });
// A Subscription belongs to one Tier
Subscriptions.belongsTo(Tiers, { foreignKey: 'tierId' });

// A User has one Subscription
User.hasOne(Subscriptions, { foreignKey: 'userid' });
// A Subscription belongs to one User
Subscriptions.belongsTo(User, { foreignKey: 'userid' });

// A Subscription can have many Payments (its payment history)
Subscriptions.hasMany(Payments, { foreignKey: 'subscriptionId' });
// A Payment belongs to one Subscription
Payments.belongsTo(Subscriptions, { foreignKey: 'subscriptionId' });



    export {
        User,
        UserProfile, 
        Exercise, 
        WorkoutPlan,
        UserWorkoutPlan,
        WorkoutLog,
        ExerciseLog,
        FoodItem,
        DietPlan,
        UserDietPlan,
        MealLog, 
        WaterLog,
        UserGoal,
        UserDietPlanFoodItem,
        WorkoutPlanExercise,
        UserWorkoutExercise,
        DietPlanFoodItem,
        TransformationJournal,
        HealthData,
        Payments, 
        Tiers, 
        Subscriptions,
    };










