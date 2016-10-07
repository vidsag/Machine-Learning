function p = predict(Theta1, Theta2, X)
%PREDICT Predict the label of an input given a trained neural network
%   p = PREDICT(Theta1, Theta2, X) outputs the predicted label of X given the
%   trained weights of a neural network (Theta1, Theta2)

% Useful values
m = size(X, 1);
num_labels = size(Theta2, 1);

% You need to return the following variables correctly 
p = zeros(size(X, 1), 1);
X = [ones(size(X,1),1) X];
a_2 = sigmoid(X * Theta1');

a_2 = [ones(size(a_2,1),1) a_2];
match = sigmoid(a_2 * Theta2');

[x, p] = max(match');
p = p';

end
